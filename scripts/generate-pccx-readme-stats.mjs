import fs from 'node:fs/promises';
import path from 'node:path';

const ORG = process.env.PCCX_STATS_ORG || 'pccxai';
const OUT_DIR = path.join(process.cwd(), 'static', 'img', 'readme');
const TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '';

// ── Language colors (GitHub's official palette) ───────────────────────────────
const LANG_COLORS = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Rust: '#dea584',
  'C++': '#f34b7d',
  Python: '#3572a5',
  SystemVerilog: '#2d7fbb',
  Verilog: '#b2b7f8',
  TeX: '#008080',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Makefile: '#427819',
};
const FALLBACK_COLORS = [
  '#58a6ff', '#bc8cff', '#ff7b72', '#ffa657', '#3fb950', '#79c0ff',
];

function getLangColor(name, index) {
  return LANG_COLORS[name] ?? FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

async function github(pathname) {
  const response = await fetch(`https://api.github.com${pathname}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'hkimw-readme-stats-generator',
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {}),
    },
  });
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${pathname}`);
  return response.json();
}

async function listOrgRepos() {
  const repos = [];
  for (let page = 1; page <= 10; page++) {
    const chunk = await github(`/orgs/${ORG}/repos?type=public&sort=updated&per_page=100&page=${page}`);
    repos.push(...chunk);
    if (chunk.length < 100) break;
  }
  return repos.filter((r) => !r.fork).sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}

async function collectLanguageBytes(repos) {
  const totals = new Map();
  for (const repo of repos) {
    const languages = await github(`/repos/${ORG}/${repo.name}/languages`);
    for (const [lang, bytes] of Object.entries(languages)) {
      totals.set(lang, (totals.get(lang) || 0) + bytes);
    }
  }
  return [...totals.entries()]
    .map(([name, bytes]) => ({ name, bytes }))
    .sort((a, b) => b.bytes - a.bytes);
}

// ── Stats card — mirrors github-readme-stats layout ──────────────────────────

const ORG_ICON = `<path d="M1.5 14.25c0 .138.112.25.25.25H4v-1.25a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 .75.75v1.25h2.25a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25h-8.5a.25.25 0 0 0-.25.25Zm3.75.25v-1.25H5.5V14.5H3.25a1.75 1.75 0 0 1-1.75-1.75V1.75C1.5.784 2.284 0 3.25 0h8.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 11.75 14H9.5v-1.25a.75.75 0 0 1-.75-.75h-2.5a.75.75 0 0 1 .75.75V14.5Z"/>`;
const STAR_ICON = `<path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>`;
const FORK_ICON = `<path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/>`;
const REPO_ICON = `<path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8Z"/>`;
const ISSUE_ICON = `<path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"/><path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"/>`;
const LANGS_ICON = `<path d="M1.5 1.75v11.5c0 .138.112.25.25.25h.75v-11.5a.25.25 0 0 0-.25-.25ZM0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v11.5A1.75 1.75 0 0 1 14.25 15h-12.5A1.75 1.75 0 0 1 0 13.25ZM4 3.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5Zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm0 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"/>`;

function icon(path, color, size = 16) {
  return `<svg fill="${color}" x="0" y="-${size - 2}" viewBox="0 0 16 16" width="${size}" height="${size}">${path}</svg>`;
}

function txt(content, x, y, fill, size, weight = '400', family = "'Segoe UI',Ubuntu,'Helvetica Neue',Arial,sans-serif") {
  const fw = weight !== '400' ? ` font-weight="${weight}"` : '';
  return `<text fill="${fill}" font-family="${family}" font-size="${size}"${fw} x="${x}" y="${y}">${escapeXml(content)}</text>`;
}

function statRow(iconPath, label, value, y, c) {
  return `
  <g transform="translate(25, ${y})">
    <svg fill="${c.icon}" x="0" y="0" viewBox="0 0 16 16" width="16" height="16">${iconPath}</svg>
    <text fill="${c.label}" font-family="'Segoe UI',Ubuntu,'Helvetica Neue',Sans-Serif" font-size="14" font-weight="600" x="25" y="12.5">${escapeXml(label)}:</text>
    <text fill="${c.label}" font-family="'Segoe UI',Ubuntu,'Helvetica Neue',Sans-Serif" font-size="14" font-weight="600" x="219.01" y="12.5">${escapeXml(String(value))}</text>
  </g>`;
}

function renderStatsCard(repos, dark) {
  const c = dark
    ? { bg: '#1e2533', border: '#444c56', title: '#79c0ff', icon: '#79c0ff', label: '#cdd9e5' }
    : { bg: '#ffffff', border: '#e4e2e2', title: '#2f80ed', icon: '#4c71f2', label: '#434d58' };

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
  const openIssues = repos.reduce((s, r) => s + r.open_issues_count, 0);

  const rows = [
    statRow(STAR_ICON,  'Total Stars',  totalStars,    0,  c),
    statRow(FORK_ICON,  'Total Forks',  totalForks,    25, c),
    statRow(REPO_ICON,  'Public Repos', repos.length,  50, c),
    statRow(ISSUE_ICON, 'Open Issues',  openIssues,    75, c),
  ].join('');

  return `<svg width="467" height="195" viewBox="0 0 467 195" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>PCCX AI Org Stats</title>
  <rect x="0.5" y="0.5" rx="4.5" height="99%" stroke="${c.border}" width="466" fill="${c.bg}" stroke-opacity="1"/>
  <g transform="translate(25, 35)">
    <svg fill="${c.icon}" x="0" y="-14" viewBox="0 0 16 16" width="19" height="19">${ORG_ICON}</svg>
    <text fill="${c.title}" font-family="'Segoe UI',Ubuntu,Sans-Serif" font-size="18" font-weight="600" x="25" y="0">PCCX AI Org Stats</text>
  </g>
  <g transform="translate(0, 55)">${rows}
    <g transform="translate(370.5, 47.5)">
      <circle cx="20" cy="40" r="40" stroke="${c.title}" fill="none" stroke-width="6" opacity="0.2"/>
      <circle cx="20" cy="40" r="40" stroke="${c.title}" fill="none" stroke-width="6" stroke-dasharray="251.32" stroke-dashoffset="75.40" stroke-linecap="round" opacity="0.8" transform="rotate(-90, 20, 40)"/>
      <svg fill="${c.label}" x="-3" y="14" height="50" width="50" viewBox="0 0 16 16">${ORG_ICON}</svg>
    </g>
  </g>
</svg>
`;
}

// ── Languages card ────────────────────────────────────────────────────────────

function renderLanguagesCard(languages, dark) {
  const c = dark
    ? { bg: '#1e2533', border: '#444c56', title: '#79c0ff', icon: '#79c0ff', label: '#cdd9e5' }
    : { bg: '#ffffff', border: '#e4e2e2', title: '#2f80ed', icon: '#4c71f2', label: '#434d58' };

  const top = languages.slice(0, 5);
  const totalTopBytes = top.reduce((s, l) => s + l.bytes, 0);
  const BAR_W = 250;
  const maskId = `bar-mask-${dark ? 'd' : 'l'}`;

  // Stacked progress bar segments (normalized to top-5 so bar fills completely)
  let barX = 0;
  const barSegments = top.map((lang, i) => {
    const w = totalTopBytes ? (lang.bytes / totalTopBytes) * BAR_W : 0;
    const seg = `<rect mask="url(#${maskId})" x="${barX.toFixed(2)}" y="0" width="${w.toFixed(2)}" height="8" fill="${getLangColor(lang.name, i)}"/>`;
    barX += w;
    return seg;
  }).join('\n      ');

  // 2-column legend (ceil(n/2) left, rest right)
  const mid = Math.ceil(top.length / 2);
  function langItem(lang, i, globalIdx) {
    const pct = totalTopBytes ? (lang.bytes / totalTopBytes * 100).toFixed(2) : '0.00';
    const color = getLangColor(lang.name, globalIdx);
    return `<g transform="translate(0, ${i * 25})">
        <circle cx="5" cy="6" r="5" fill="${color}"/>
        <text x="15" y="10" fill="${c.label}" font-family="'Segoe UI',Ubuntu,Sans-Serif" font-size="11">${escapeXml(lang.name)} ${pct}%</text>
      </g>`;
  }
  const leftCol  = top.slice(0, mid).map((l, i) => langItem(l, i, i)).join('\n      ');
  const rightCol = top.slice(mid).map((l, i)  => langItem(l, i, mid + i)).join('\n      ');

  const numRows = mid;
  const height  = 80 + (numRows - 1) * 25 + 35;

  return `<svg width="300" height="${height}" viewBox="0 0 300 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" role="img">
  <title>PCCX AI Most Used Languages</title>
  <rect x="0.5" y="0.5" rx="4.5" height="99%" stroke="${c.border}" width="299" fill="${c.bg}" stroke-opacity="1"/>
  <g transform="translate(25, 35)">
    <svg fill="${c.icon}" x="0" y="-14" viewBox="0 0 16 16" width="18" height="18">${LANGS_ICON}</svg>
    <text fill="${c.title}" font-family="'Segoe UI',Ubuntu,Sans-Serif" font-size="18" font-weight="600" x="25" y="0">Most Used Languages</text>
  </g>
  <g transform="translate(0, 55)">
    <svg x="25">
      <mask id="${maskId}">
        <rect x="0" y="0" width="${BAR_W}" height="8" fill="white" rx="5"/>
      </mask>
      ${barSegments}
      <g transform="translate(0, 25)">
        <g transform="translate(0, 0)">
          ${leftCol}
        </g>
        <g transform="translate(150, 0)">
          ${rightCol}
        </g>
      </g>
    </svg>
  </g>
</svg>
`;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const repos = await listOrgRepos();
  const languages = await collectLanguageBytes(repos);

  await fs.writeFile(path.join(OUT_DIR, 'pccxai-stats.svg'), renderStatsCard(repos, false));
  await fs.writeFile(path.join(OUT_DIR, 'pccxai-stats-dark.svg'), renderStatsCard(repos, true));
  await fs.writeFile(path.join(OUT_DIR, 'pccxai-langs.svg'), renderLanguagesCard(languages, false));
  await fs.writeFile(path.join(OUT_DIR, 'pccxai-langs-dark.svg'), renderLanguagesCard(languages, true));

  console.log(`Generated PCCX AI README cards (light + dark) for ${repos.length} repositories.`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
