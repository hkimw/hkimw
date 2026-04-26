import fs from 'fs';
import path from 'path';

function processFile(filePath, isKoDir) {
  if (!filePath.endsWith('.md') && !filePath.endsWith('.mdx')) return;
  let content = fs.readFileSync(filePath, 'utf8');
  
  // if content doesn't contain Korean characters, return
  if (!/[\u3131-\uD79D]/.test(content)) return;

  const lines = content.split('\n');
  if (lines[0] !== '---') return;

  // check if draft is already there
  if (lines.some(l => l.startsWith('draft: '))) return;

  const draftValue = isKoDir ? 'false' : 'true';
  lines.splice(1, 0, `draft: ${draftValue}`);
  fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
}

const blogDir = 'blog';
const koDir = 'i18n/ko/docusaurus-plugin-content-blog';

fs.readdirSync(blogDir).forEach(file => processFile(path.join(blogDir, file), false));
fs.readdirSync(koDir).forEach(file => processFile(path.join(koDir, file), true));

console.log('Done marking Korean posts as draft:true in EN and draft:false in KR');
