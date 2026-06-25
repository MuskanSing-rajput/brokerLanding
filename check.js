const fs = require('fs');
const content = fs.readFileSync('app/page.tsx', 'utf8');
const lines = content.split('\n');

let openTags = [];
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  let m;
  const regexOpen = /<([a-zA-Z0-9]+)(?![^>]*\/>)[^>]*>/g;
  while ((m = regexOpen.exec(line)) !== null) {
    if (!['br', 'img', 'input', 'source', 'video', 'polygon', 'polyline', 'path', 'line'].includes(m[1]) && !m[0].includes('/>') && !m[0].startsWith('</')) {
      openTags.push({ tag: m[1], line: i + 1 });
    }
  }
  
  const regexClose = /<\/([a-zA-Z0-9]+)>/g;
  while ((m = regexClose.exec(line)) !== null) {
    if (openTags.length === 0) {
      console.log(`Unmatched closing tag </${m[1]}> at line ${i + 1}`);
    } else {
      const last = openTags.pop();
      if (last.tag !== m[1]) {
        console.log(`Mismatched tag at line ${i + 1}: Expected </${last.tag}> (opened at ${last.line}), but found </${m[1]}>`);
      }
    }
  }
}
console.log('Unclosed tags:', openTags.slice(-10));
