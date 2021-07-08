/*  eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const JsonToTS = require('fork-json2ts');
const themeJson = require('../statics/theme.json');

let colorObj = {};

Object.keys(themeJson.themes).forEach(key => {
  colorObj = { ...colorObj, ...themeJson.themes[key] };
});

const typeFileContent = `export ${JsonToTS(colorObj, { rootName: 'Type', prefix: 'StaticColor' }).join(';\n')}`.trim();

fs.writeFileSync(path.join(process.cwd(), 'src', 'helpers', 'static-types.ts'), typeFileContent);
