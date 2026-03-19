const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.resolve(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if(file.endsWith('.jsx') || file.endsWith('.css')) results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // #802B3D (Burgundy) -> #006A67 (Teal)
  content = content.replace(/#802B3D/ig, '#006A67');
  content = content.replace(/bg-rose-800/g, 'bg-[#006A67]');
  content = content.replace(/text-rose-800/g, 'text-[#006A67]');
  content = content.replace(/border-rose-800/g, 'border-[#006A67]');
  content = content.replace(/fill-rose-800/g, 'fill-[#006A67]');
  content = content.replace(/text-rose-500/g, 'text-[#006A67]');
  content = content.replace(/fill-rose-500/g, 'fill-[#006A67]');
  content = content.replace(/rose-50/g, '[#006A67]/10');
  content = content.replace(/text-rose-900/g, 'text-[#000B58]');

  // #5e1f2c (Dark Burgundy) -> #000B58 (Deep Navy)
  content = content.replace(/#5e1f2c/ig, '#000B58');

  // #FAF9F6 (Off-white) -> #FFF4B7 (Light Yellow)
  content = content.replace(/#FAF9F6/ig, '#FFF4B7');
  
  // #D4AF37 (Gold) -> #003161 (Navy Accent)
  content = content.replace(/#D4AF37/ig, '#003161');
  content = content.replace(/amber-400/g, '[#003161]');
  content = content.replace(/amber-500/g, '[#000B58]');

  fs.writeFileSync(file, content, 'utf8');
});
console.log('Color replacements completed across all files.');
