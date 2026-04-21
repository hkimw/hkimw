#!/usr/bin/env node

import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const STATE_DIR = path.join(ROOT, '.ai-publish');
const STATE_FILE = path.join(STATE_DIR, 'state.json');
const KO_BLOG_DIR = path.join(ROOT, 'i18n/ko/docusaurus-plugin-content-blog');
const EN_BLOG_DIR = path.join(ROOT, 'blog');

const INFO_TEXT =
  '이 글의 원본은 Google Docs에서 작성되었고 AI를 통해 시각화 및 검수 되었습니다.';
const ORIGINAL_PLACEHOLDER_PREFIX = '__AI_ORIGINAL_DOC_URL__';
const DRIVE_FOLDER_DEFAULTS = {
  DRAFTS: '작성중',
  READY: 'to publish translate and verify',
  VISUALIZE: 'to publish visualize',
  PUBLISH: 'publish',
};

const command = process.argv[2] ?? 'generate';
const publishMode = env('BLOG_AI_PUBLISH_MODE', 'dry-run');
const isCommitMode = publishMode === 'commit';

main().catch(async (error) => {
  console.error(error);
  await notifyTelegram(`AI 블로그 게시 실패\n\n${error.message}`);
  process.exit(1);
});

async function main() {
  if (command === 'generate') {
    await generate();
    return;
  }

  if (command === 'finalize') {
    await finalize();
    return;
  }

  if (command === 'notify-published') {
    await notifyTelegram(`게시 완료: ${env('BLOG_DEPLOY_URL', env('BLOG_BASE_URL', ''))}`);
    return;
  }

  throw new Error(`Unknown command: ${command}`);
}

async function generate() {
  await fs.mkdir(STATE_DIR, {recursive: true});

  const google = new GoogleClient();
  const ai = new GeminiClient();
  const candidates = await loadCandidateDocs(google);
  const entries = [];
  const failures = [];

  if (candidates.length === 0) {
    await writeState({entries, failures, generatedAt: new Date().toISOString(), mode: publishMode});
    if (env('BLOG_NOTIFY_EMPTY', 'false') === 'true') {
      await notifyTelegram('AI 블로그 게시: 처리할 Google Docs 문서가 없습니다.');
    }
    return;
  }

  for (const file of candidates) {
    try {
      const entry = await processDocument({google, ai, file});
      entries.push(entry);
    } catch (error) {
      failures.push({id: file.id, name: file.name, error: error.message});
      await notifyTelegram(`AI 블로그 게시 취소: ${file.name}\n\n${error.message}`);
      if (isCommitMode) {
        try {
          const draftsFolder = await resolveDriveFolder(google, 'DRAFTS', {required: false});
          if (draftsFolder) {
            await google.moveFile(file.id, {
              addParents: draftsFolder.id,
              removeParents: file.parents ?? [],
            });
          }
        } catch (moveError) {
          console.warn(`Failed to move blocked document back to drafts: ${moveError.message}`);
        }
      }
    }
  }

  await writeState({entries, failures, generatedAt: new Date().toISOString(), mode: publishMode});

  if (entries.length > 0) {
    const titles = entries.map((entry) => `- ${entry.titleKo} / ${entry.titleEn}`).join('\n');
    await notifyTelegram(
      `AI 블로그 초안 생성 완료 (${publishMode})\n\n${titles}\n\nbuild 검증을 계속 진행합니다.`,
    );
  }
}

async function finalize() {
  if (!isCommitMode) {
    console.log('Finalize skipped because BLOG_AI_PUBLISH_MODE is not commit.');
    return;
  }

  const state = await readState();
  if (!state.entries?.length) {
    console.log('No generated entries to finalize.');
    return;
  }

  const google = new GoogleClient();
  const visualizeRoot = await resolveDriveFolder(google, 'VISUALIZE');
  const publishRoot = await resolveDriveFolder(google, 'PUBLISH');
  const finalized = [];

  for (const entry of state.entries) {
    const folderName = `${entry.postDate}-${entry.slug}`;
    const visualizeFolder = await google.createFolderIfMissing(folderName, visualizeRoot.id);
    const publishFolder = await google.createFolderIfMissing(folderName, publishRoot.id);

    const koOriginal = await google.createGoogleDoc(
      `[kr] ${entry.titleKo}`,
      entry.publicDocs.ko,
      visualizeFolder.id,
    );
    const enOriginal = await google.createGoogleDoc(
      `[en] ${entry.titleEn}`,
      entry.publicDocs.en,
      visualizeFolder.id,
    );

    await google.createGoogleDoc(`[kr] ${entry.titleKo}`, entry.archiveDocs.ko, publishFolder.id);
    await google.createGoogleDoc(`[en] ${entry.titleEn}`, entry.archiveDocs.en, publishFolder.id);

    await replaceInFile(entry.files.ko, entry.placeholders.ko, koOriginal.webViewLink);
    await replaceInFile(entry.files.en, entry.placeholders.en, enOriginal.webViewLink);

    await google.moveFile(entry.source.id, {
      addParents: publishFolder.id,
      removeParents: entry.source.parents ?? [],
    });

    finalized.push({
      slug: entry.slug,
      titleKo: entry.titleKo,
      titleEn: entry.titleEn,
      koOriginal: koOriginal.webViewLink,
      enOriginal: enOriginal.webViewLink,
    });
  }

  await writeState({...state, finalized, finalizedAt: new Date().toISOString()});

  const lines = finalized
    .map((entry) => `- ${entry.titleKo}\n  KR: ${entry.koOriginal}\n  EN: ${entry.enOriginal}`)
    .join('\n');
  await notifyTelegram(`AI 블로그 원본 문서 생성 완료\n\n${lines}\n\n이제 commit/push를 진행합니다.`);
}

async function processDocument({google, ai, file}) {
  const doc = await google.getDocument(file.id);
  const sourceText = extractGoogleDocText(doc).trim();

  if (!sourceText) {
    throw new Error('문서에서 읽을 수 있는 본문 텍스트가 없습니다.');
  }

  const sourceTitle = doc.title || file.name;
  const precheck = await ai.jsonTask({
    name: 'korean_precheck',
    schema: precheckSchema,
    system: [
      'You are a Korean technical editor.',
      'Return JSON only.',
      'Block publishing only for actionable Korean grammar errors, internal contradictions, missing critical context, or high-confidence technical correctness problems.',
      'Do not block for taste, tone, or minor stylistic preferences.',
    ].join('\n'),
    user: [
      `Document title: ${sourceTitle}`,
      '',
      'Review this Korean draft before blog publishing.',
      'If there are actionable warnings, set ok=false and explain them.',
      'If ok=true, provide cleanedKorean with only safe grammar/clarity edits.',
      '',
      sourceText,
    ].join('\n'),
  });

  if (!precheck.ok || precheck.warnings.length > 0) {
    throw new Error(
      [
        '한국어 원문 검수에서 게시 중단되었습니다.',
        `요약: ${precheck.summary}`,
        ...precheck.warnings.map((warning) => `- ${warning}`),
      ].join('\n'),
    );
  }

  const koreanDraft = precheck.cleanedKorean.trim();
  const translation1 = await ai.jsonTask({
    name: 'translation_draft',
    schema: translationSchema,
    system: [
      'You are a precise Korean-to-English technical translator.',
      'Return JSON only.',
      'Preserve technical meaning, equations, code terms, paper names, and proper nouns.',
      'Write natural English for an international developer/research audience.',
    ].join('\n'),
    user: [
      `Source title: ${sourceTitle}`,
      '',
      'Translate this Korean blog draft into English.',
      '',
      koreanDraft,
    ].join('\n'),
  });

  const review1 = await ai.jsonTask({
    name: 'translation_review_1',
    schema: reviewSchema,
    system: [
      'You are a translation reviewer.',
      'Return JSON only.',
      'Compare Korean source and English translation for meaning loss, hallucination, terminology drift, and unclear English.',
    ].join('\n'),
    user: [
      'Korean source:',
      koreanDraft,
      '',
      'English translation:',
      JSON.stringify(translation1, null, 2),
    ].join('\n'),
  });

  const translation2 = await ai.jsonTask({
    name: 'translation_revision',
    schema: translationSchema,
    system: [
      'You are a senior technical translator revising an English translation after review.',
      'Return JSON only.',
      'Apply the review feedback while preserving the Korean source meaning.',
    ].join('\n'),
    user: [
      'Korean source:',
      koreanDraft,
      '',
      'Current English translation:',
      JSON.stringify(translation1, null, 2),
      '',
      'Review feedback:',
      JSON.stringify(review1, null, 2),
    ].join('\n'),
  });

  const review2 = await ai.jsonTask({
    name: 'translation_review_2',
    schema: reviewSchema,
    system: [
      'You are the final translation verifier.',
      'Return JSON only.',
      'Approve only if the English translation faithfully matches the Korean source and is publishable.',
    ].join('\n'),
    user: [
      'Korean source:',
      koreanDraft,
      '',
      'Revised English translation:',
      JSON.stringify(translation2, null, 2),
    ].join('\n'),
  });

  if (!review2.pass) {
    const issues = review2.issues.map((issue) => `- ${issue.severity}: ${issue.issue}`).join('\n');
    throw new Error(`영어 번역 최종 검수에서 게시 중단되었습니다.\n\n${issues}`);
  }

  const visualized = await ai.jsonTask({
    name: 'docusaurus_visualization',
    schema: visualizationSchema,
    system: [
      'You are a Docusaurus technical blog editor.',
      'Return JSON only.',
      'Create publishable Markdown bodies from zero base. Do not copy Google Docs formatting.',
      'Use Mermaid diagrams, equations, tables, and code blocks only when they make the article clearer.',
      'Do not include YAML front matter, Docusaurus admonition info blocks, or <!-- truncate -->.',
      'Keep Korean content Korean and English content English.',
      'Every Mermaid code block must be valid and fenced with ```mermaid.',
    ].join('\n'),
    user: [
      'Korean source:',
      koreanDraft,
      '',
      'Final English translation:',
      JSON.stringify(translation2, null, 2),
      '',
      'Create final Docusaurus Markdown bodies for both locales.',
    ].join('\n'),
  });

  const postDate = env('BLOG_POST_DATE', dateInTimeZone(env('BLOG_POST_TIMEZONE', 'Asia/Seoul')));
  const slug = await uniqueSlug(sanitizeSlug(visualized.slug || sourceTitle), postDate);
  const placeholders = {
    ko: `${ORIGINAL_PLACEHOLDER_PREFIX}_KO_${file.id}`,
    en: `${ORIGINAL_PLACEHOLDER_PREFIX}_EN_${file.id}`,
  };

  const titleKo = cleanOneLine(visualized.titleKo || sourceTitle);
  const titleEn = cleanOneLine(visualized.titleEn || translation2.title);

  const koPost = composePost({
    title: titleKo,
    authors: ['hwkim'],
    tags: normalizeTags(visualized.tagsKo),
    slug,
    excerpt: visualized.excerptKo,
    body: visualized.koMarkdown,
    originalUrl: placeholders.ko,
  });
  const enPost = composePost({
    title: titleEn,
    authors: ['hwkim'],
    tags: normalizeTags(visualized.tagsEn),
    slug,
    excerpt: visualized.excerptEn,
    body: visualized.enMarkdown,
    originalUrl: placeholders.en,
  });

  const koFile = path.join(KO_BLOG_DIR, `${postDate}-${slug}.md`);
  const enFile = path.join(EN_BLOG_DIR, `${postDate}-${slug}.md`);

  await fs.mkdir(KO_BLOG_DIR, {recursive: true});
  await fs.mkdir(EN_BLOG_DIR, {recursive: true});
  await fs.writeFile(koFile, koPost, 'utf8');
  await fs.writeFile(enFile, enPost, 'utf8');

  return {
    source: {
      id: file.id,
      name: file.name,
      parents: file.parents ?? [],
      webViewLink: file.webViewLink,
    },
    postDate,
    slug,
    titleKo,
    titleEn,
    files: {
      ko: path.relative(ROOT, koFile),
      en: path.relative(ROOT, enFile),
    },
    placeholders,
    publicDocs: {
      ko: publicDocContent({title: titleKo, markdown: koPost}),
      en: publicDocContent({title: titleEn, markdown: enPost}),
    },
    archiveDocs: {
      ko: koPost,
      en: enPost,
    },
  };
}

async function loadCandidateDocs(google) {
  const explicitDocumentId = env('BLOG_DOCUMENT_ID', '').trim();
  if (explicitDocumentId) {
    return [await google.getFile(explicitDocumentId)];
  }

  const readyFolder = await resolveDriveFolder(google, 'READY');
  const maxDocs = Number(env('BLOG_MAX_DOCS_PER_RUN', '1'));
  return google.listDocsInFolder(readyFolder.id, maxDocs);
}

async function resolveDriveFolder(google, key, options = {}) {
  const {required = true} = options;
  const id = env(`GDRIVE_${key}_FOLDER_ID`, '');
  const defaultName = DRIVE_FOLDER_DEFAULTS[key] ?? '';
  const name = env(`GDRIVE_${key}_FOLDER_NAME`, defaultName);

  if (id) {
    return {id, name: name || id};
  }

  if (!name) {
    if (required) {
      throw new Error(`GDRIVE_${key}_FOLDER_ID 또는 GDRIVE_${key}_FOLDER_NAME이 필요합니다.`);
    }
    return null;
  }

  const folders = await google.findFoldersByName(name);
  if (folders.length === 0) {
    if (required) {
      throw new Error(
        `Google Drive에서 "${name}" 폴더를 찾지 못했습니다. service account에 폴더를 공유했는지 확인하거나 GDRIVE_${key}_FOLDER_ID를 설정하세요.`,
      );
    }
    return null;
  }

  if (folders.length > 1) {
    throw new Error(
      `Google Drive에서 "${name}" 폴더가 ${folders.length}개 발견되었습니다. 정확한 GDRIVE_${key}_FOLDER_ID를 설정하세요.`,
    );
  }

  return folders[0];
}

function extractGoogleDocText(document) {
  const parts = [];

  if (document.body?.content) {
    collectStructuralText(document.body.content, parts);
  }

  for (const tab of document.tabs ?? []) {
    const content = tab.documentTab?.body?.content;
    if (content) {
      collectStructuralText(content, parts);
    }
  }

  return parts.join('').replace(/\n{3,}/g, '\n\n');
}

function collectStructuralText(elements, parts) {
  for (const element of elements) {
    if (element.paragraph?.elements) {
      for (const paragraphElement of element.paragraph.elements) {
        if (paragraphElement.textRun?.content) {
          parts.push(paragraphElement.textRun.content);
        }
      }
    }

    if (element.table?.tableRows) {
      for (const row of element.table.tableRows) {
        const rowParts = [];
        for (const cell of row.tableCells ?? []) {
          const cellParts = [];
          collectStructuralText(cell.content ?? [], cellParts);
          rowParts.push(cellParts.join('').trim());
        }
        parts.push(rowParts.join(' | '), '\n');
      }
    }

    if (element.tableOfContents?.content) {
      collectStructuralText(element.tableOfContents.content, parts);
    }
  }
}

function composePost({title, authors, tags, slug, excerpt, body, originalUrl}) {
  const normalizedExcerpt = normalizeMarkdown(excerpt);
  const normalizedBody = stripFrontMatter(normalizeMarkdown(body));
  return [
    '---',
    `slug: ${yamlString(slug)}`,
    `title: ${yamlString(title)}`,
    `authors: [${authors.map(yamlString).join(', ')}]`,
    `tags: [${tags.map(yamlString).join(', ')}]`,
    '---',
    '',
    ':::info',
    INFO_TEXT,
    '',
    `Original: [원본 보기](${originalUrl})`,
    ':::',
    '',
    normalizedExcerpt,
    '',
    '<!-- truncate -->',
    '',
    normalizedBody,
    '',
  ].join('\n');
}

function publicDocContent({title, markdown}) {
  return [`# ${title}`, '', markdown.replaceAll(ORIGINAL_PLACEHOLDER_PREFIX, 'pending-original-link')].join(
    '\n',
  );
}

function normalizeMarkdown(value) {
  return String(value ?? '')
    .replace(/\r\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim();
}

function stripFrontMatter(markdown) {
  return markdown.replace(/^---\n[\s\S]*?\n---\n?/, '').trim();
}

async function uniqueSlug(baseSlug, postDate) {
  let slug = baseSlug || 'post';
  let index = 2;

  while (
    existsSync(path.join(EN_BLOG_DIR, `${postDate}-${slug}.md`)) ||
    existsSync(path.join(KO_BLOG_DIR, `${postDate}-${slug}.md`))
  ) {
    slug = `${baseSlug}-${index}`;
    index += 1;
  }

  return slug;
}

function sanitizeSlug(value) {
  return String(value ?? '')
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .toLowerCase()
    .replace(/_/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

function normalizeTags(tags) {
  const values = Array.isArray(tags) ? tags : [];
  const cleaned = values
    .map((tag) => cleanOneLine(tag).toLowerCase())
    .filter(Boolean)
    .slice(0, 8);
  return cleaned.length ? cleaned : ['blog'];
}

function cleanOneLine(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim();
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function dateInTimeZone(timeZone) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(new Date());

  const byType = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${byType.year}-${byType.month}-${byType.day}`;
}

async function replaceInFile(relativePath, search, replacement) {
  const filePath = path.join(ROOT, relativePath);
  const raw = await fs.readFile(filePath, 'utf8');
  await fs.writeFile(filePath, raw.replaceAll(search, replacement), 'utf8');
}

async function writeState(state) {
  await fs.mkdir(STATE_DIR, {recursive: true});
  await fs.writeFile(STATE_FILE, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}

async function readState() {
  return JSON.parse(await fs.readFile(STATE_FILE, 'utf8'));
}

async function notifyTelegram(text) {
  const token = env('TELEGRAM_BOT_TOKEN', '');
  const chatId = env('TELEGRAM_CHAT_ID', '');
  if (!token || !chatId) {
    return;
  }

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      chat_id: chatId,
      text: text.slice(0, 4000),
      disable_web_page_preview: true,
    }),
  });

  if (!response.ok) {
    console.warn(`Telegram notification failed: ${response.status} ${await response.text()}`);
  }
}

class GoogleClient {
  constructor() {
    this.serviceAccount = loadServiceAccount();
    this.accessToken = null;
    this.expiresAt = 0;
  }

  async getDocument(documentId) {
    return this.request(
      `https://docs.googleapis.com/v1/documents/${documentId}?includeTabsContent=true`,
    );
  }

  async getFile(fileId) {
    return this.request(
      `https://www.googleapis.com/drive/v3/files/${fileId}?fields=id,name,mimeType,parents,webViewLink,modifiedTime`,
    );
  }

  async listDocsInFolder(folderId, pageSize) {
    const query = [
      `'${folderId}' in parents`,
      "mimeType='application/vnd.google-apps.document'",
      'trashed=false',
    ].join(' and ');
    const data = await this.request(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
        query,
      )}&orderBy=modifiedTime&pageSize=${pageSize}&fields=files(id,name,mimeType,parents,webViewLink,modifiedTime)`,
    );
    return data.files ?? [];
  }

  async createFolder(name, parentId) {
    return this.request('https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink', {
      method: 'POST',
      body: {
        name,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentId],
      },
    });
  }

  async createFolderIfMissing(name, parentId) {
    const matches = await this.findFoldersByName(name, parentId);
    if (matches.length > 0) {
      return matches[0];
    }
    return this.createFolder(name, parentId);
  }

  async findFoldersByName(name, parentId = '') {
    const queryParts = [
      `name='${escapeDriveQueryString(name)}'`,
      "mimeType='application/vnd.google-apps.folder'",
      'trashed=false',
    ];
    if (parentId) {
      queryParts.push(`'${escapeDriveQueryString(parentId)}' in parents`);
    }
    const data = await this.request(
      `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
        queryParts.join(' and '),
      )}&pageSize=10&fields=files(id,name,parents,webViewLink,modifiedTime)`,
    );
    return data.files ?? [];
  }

  async createGoogleDoc(name, content, parentId) {
    const file = await this.request(
      'https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink',
      {
        method: 'POST',
        body: {
          name,
          mimeType: 'application/vnd.google-apps.document',
          parents: [parentId],
        },
      },
    );

    await this.insertText(file.id, content);

    if (env('GDRIVE_MAKE_PUBLIC', 'false') === 'true') {
      await this.makePublic(file.id);
    }

    return file;
  }

  async insertText(documentId, content) {
    const chunks = chunkString(content, 20000);
    let index = 1;

    for (const chunk of chunks) {
      await this.request(`https://docs.googleapis.com/v1/documents/${documentId}:batchUpdate`, {
        method: 'POST',
        body: {
          requests: [
            {
              insertText: {
                location: {index},
                text: chunk,
              },
            },
          ],
        },
      });
      index += chunk.length;
    }
  }

  async makePublic(fileId) {
    await this.request(
      `https://www.googleapis.com/drive/v3/files/${fileId}/permissions?fields=id`,
      {
        method: 'POST',
        body: {
          type: 'anyone',
          role: 'reader',
        },
      },
    );
  }

  async moveFile(fileId, {addParents, removeParents}) {
    const params = new URLSearchParams();
    if (addParents) {
      params.set('addParents', Array.isArray(addParents) ? addParents.join(',') : addParents);
    }
    if (removeParents?.length) {
      params.set('removeParents', removeParents.join(','));
    }
    params.set('fields', 'id,parents');
    return this.request(`https://www.googleapis.com/drive/v3/files/${fileId}?${params}`, {
      method: 'PATCH',
      body: {},
    });
  }

  async request(url, options = {}) {
    const token = await this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${token}`,
      ...(options.body ? {'Content-Type': 'application/json'} : {}),
      ...(options.headers ?? {}),
    };
    const response = await fetch(url, {
      method: options.method ?? 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      throw new Error(`Google API failed: ${response.status} ${await response.text()}`);
    }

    return response.status === 204 ? null : response.json();
  }

  async getAccessToken() {
    if (this.accessToken && Date.now() < this.expiresAt - 60000) {
      return this.accessToken;
    }

    const now = Math.floor(Date.now() / 1000);
    const jwtHeader = base64Url(JSON.stringify({alg: 'RS256', typ: 'JWT'}));
    const jwtClaim = base64Url(
      JSON.stringify({
        iss: this.serviceAccount.client_email,
        scope: [
          'https://www.googleapis.com/auth/drive',
          'https://www.googleapis.com/auth/documents',
        ].join(' '),
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
      }),
    );
    const unsignedJwt = `${jwtHeader}.${jwtClaim}`;
    const signature = crypto.sign(
      'RSA-SHA256',
      Buffer.from(unsignedJwt),
      this.serviceAccount.private_key,
    );
    const assertion = `${unsignedJwt}.${base64Url(signature)}`;

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion,
      }),
    });

    if (!response.ok) {
      throw new Error(`Google auth failed: ${response.status} ${await response.text()}`);
    }

    const data = await response.json();
    this.accessToken = data.access_token;
    this.expiresAt = Date.now() + data.expires_in * 1000;
    return this.accessToken;
  }
}

class GeminiClient {
  constructor() {
    this.apiKey = env('GEMINI_API_KEY', '');
    if (!this.apiKey) {
      throw new Error('GEMINI_API_KEY가 필요합니다.');
    }
    this.baseUrl = env(
      'GEMINI_API_BASE_URL',
      'https://generativelanguage.googleapis.com/v1beta',
    ).replace(/\/$/, '');
    this.model = env('GEMINI_MODEL', 'gemini-2.5-pro');
  }

  async jsonTask({name, schema, system, user}) {
    const body = {
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: [
                `Task name: ${name}`,
                '',
                'System instructions:',
                system,
                '',
                'User request:',
                user,
              ].join('\n'),
            },
          ],
        },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        responseJsonSchema: toGeminiSchema(schema),
        maxOutputTokens: Number(env('GEMINI_MAX_OUTPUT_TOKENS', '65536')),
        temperature: Number(env('GEMINI_TEMPERATURE', '0.2')),
      },
    };

    const response = await this.requestGenerateContent(body);
    return parseJsonOutput(response);
  }

  async requestGenerateContent(body) {
    const response = await fetch(
      `${this.baseUrl}/models/${encodeURIComponent(this.model)}:generateContent`,
      {
        method: 'POST',
        headers: {
          'x-goog-api-key': this.apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    const text = await response.text();
    if (!response.ok) {
      throw new Error(`Gemini API failed: ${response.status} ${text}`);
    }

    return JSON.parse(text);
  }
}

function parseJsonOutput(response) {
  const text = extractResponseText(response).trim();
  const cleaned = text
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim();
  return JSON.parse(cleaned);
}

function extractResponseText(response) {
  if (response.promptFeedback?.blockReason) {
    throw new Error(`Gemini blocked the prompt: ${response.promptFeedback.blockReason}`);
  }

  const parts = [];
  for (const candidate of response.candidates ?? []) {
    if (candidate.finishReason && candidate.finishReason !== 'STOP') {
      console.warn(`Gemini candidate finishReason: ${candidate.finishReason}`);
    }
    for (const part of candidate.content?.parts ?? []) {
      if (part.text) {
        parts.push(part.text);
      }
    }
  }

  if (!parts.length) {
    throw new Error(`Gemini response did not contain text: ${JSON.stringify(response)}`);
  }

  return parts.join('\n');
}

function toGeminiSchema(schema) {
  if (!schema || typeof schema !== 'object') {
    return schema;
  }

  if (Array.isArray(schema)) {
    return schema.map(toGeminiSchema);
  }

  const cleaned = {};
  for (const [key, value] of Object.entries(schema)) {
    if (key === 'additionalProperties') {
      continue;
    }
    cleaned[key] = toGeminiSchema(value);
  }

  if (cleaned.type === 'object' && cleaned.properties && !cleaned.propertyOrdering) {
    cleaned.propertyOrdering = Object.keys(cleaned.properties);
  }

  return cleaned;
}

function loadServiceAccount() {
  const raw = env('GOOGLE_CREDENTIALS', env('GOOGLE_SERVICE_ACCOUNT_JSON', ''));
  const b64 = env('GOOGLE_SERVICE_ACCOUNT_JSON_B64', '');
  let jsonText = '';

  if (raw) {
    if (raw.trim().startsWith('{')) {
      jsonText = raw;
    } else if (existsSync(raw)) {
      jsonText = readFileSync(raw, 'utf8');
    } else {
      jsonText = Buffer.from(raw, 'base64').toString('utf8');
    }
  } else if (b64) {
    jsonText = Buffer.from(b64, 'base64').toString('utf8');
  } else {
    throw new Error(
      'GOOGLE_CREDENTIALS, GOOGLE_SERVICE_ACCOUNT_JSON, 또는 GOOGLE_SERVICE_ACCOUNT_JSON_B64가 필요합니다.',
    );
  }

  const parsed = JSON.parse(jsonText);
  parsed.private_key = parsed.private_key.replace(/\\n/g, '\n');
  return parsed;
}

function base64Url(value) {
  const buffer = Buffer.isBuffer(value) ? value : Buffer.from(value);
  return buffer
    .toString('base64')
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/g, '');
}

function escapeDriveQueryString(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function chunkString(value, size) {
  const chunks = [];
  for (let index = 0; index < value.length; index += size) {
    chunks.push(value.slice(index, index + size));
  }
  return chunks;
}

function requireEnv(name) {
  const value = env(name, '');
  if (!value) {
    throw new Error(`${name} 환경변수가 필요합니다.`);
  }
  return value;
}

function env(name, fallback = undefined) {
  const value = process.env[name];
  return value === undefined || value === '' ? fallback : value;
}

const precheckSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ok: {type: 'boolean'},
    severity: {type: 'string', enum: ['pass', 'block']},
    summary: {type: 'string'},
    warnings: {type: 'array', items: {type: 'string'}},
    cleanedKorean: {type: 'string'},
  },
  required: ['ok', 'severity', 'summary', 'warnings', 'cleanedKorean'],
};

const translationSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    title: {type: 'string'},
    excerpt: {type: 'string'},
    tags: {type: 'array', items: {type: 'string'}},
    markdownBody: {type: 'string'},
  },
  required: ['title', 'excerpt', 'tags', 'markdownBody'],
};

const reviewSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    pass: {type: 'boolean'},
    summary: {type: 'string'},
    issues: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          severity: {type: 'string', enum: ['minor', 'major']},
          issue: {type: 'string'},
          recommendation: {type: 'string'},
        },
        required: ['severity', 'issue', 'recommendation'],
      },
    },
    revisionInstructions: {type: 'string'},
  },
  required: ['pass', 'summary', 'issues', 'revisionInstructions'],
};

const visualizationSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    slug: {type: 'string'},
    titleKo: {type: 'string'},
    titleEn: {type: 'string'},
    excerptKo: {type: 'string'},
    excerptEn: {type: 'string'},
    tagsKo: {type: 'array', items: {type: 'string'}},
    tagsEn: {type: 'array', items: {type: 'string'}},
    koMarkdown: {type: 'string'},
    enMarkdown: {type: 'string'},
  },
  required: [
    'slug',
    'titleKo',
    'titleEn',
    'excerptKo',
    'excerptEn',
    'tagsKo',
    'tagsEn',
    'koMarkdown',
    'enMarkdown',
  ],
};
