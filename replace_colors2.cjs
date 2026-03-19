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
  
  // Previous Primary (#006A67) -> New Vibrant Pink (#FF3E9B)
  content = content.replace(/#006A67/ig, '#FF3E9B');
  content = content.replace(/bg-\[#006A67\]/g, 'bg-[#FF3E9B]');
  content = content.replace(/text-\[#006A67\]/g, 'text-[#FF3E9B]');
  content = content.replace(/border-\[#006A67\]/g, 'border-[#FF3E9B]');
  content = content.replace(/fill-\[#006A67\]/g, 'fill-[#FF3E9B]');

  // Previous Dark Navy (#000B58) -> New Dark Teal (#3A8B95) for footers/dark sections
  content = content.replace(/#000B58/ig, '#3A8B95');
  content = content.replace(/bg-\[#000B58\]/g, 'bg-[#3A8B95]');
  content = content.replace(/text-\[#000B58\]/g, 'text-[#3A8B95]');

  // Previous Light Yellow/Cream Background (#FFF4B7) -> Soft Bridal Pink White (#FFF7FA)
  // And use Light Pink (#FF88BA) for some accents
  content = content.replace(/#FFF4B7/ig, '#FFF7FA'); 
  
  // Previous Navy Accent (#003161) -> New Light Teal (#66D0BC) for stars/badges
  content = content.replace(/#003161/ig, '#66D0BC');
  content = content.replace(/\[#003161\]/g, '[#66D0BC]');

  // Apply Light Pink (#FF88BA) where we might want softer backgrounds or secondary elements
  // We'll replace some #3A8B95 (Dark Teal) text with #FF88BA if it was originally an accent
  
  // Let's also ensure the 3D shadows match the new colors
  // Previous Sapphire shadow (0, 49, 97) -> Teal shadow (58, 139, 149)
  content = content.replace(/0, 49, 97/g, '58, 139, 149');
  // Previous Navy shadow (0, 11, 88) -> Vibrant Pink shadow (255, 62, 155)
  content = content.replace(/0, 11, 88/g, '255, 62, 155');

  fs.writeFileSync(file, content, 'utf8');
});
console.log('Second color replacement completed - Pink & Teal Wedding Theme applied.');
