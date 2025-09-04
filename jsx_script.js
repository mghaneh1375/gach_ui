const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;

function containsJSX(code, filePath) {
  try {
    const ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx'],
    });

    let hasJSX = false;

    traverse(ast, {
      JSXElement() {
        hasJSX = true;
      },
      JSXFragment() {
        hasJSX = true;
      },
    });

    return hasJSX;
  } catch (error) {
    console.warn(`⚠️ Skipping file (parse error): ${filePath}`);
    return false;
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.js')) {
      console.log(`detect ${fullPath}`);
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (containsJSX(content, fullPath)) {
        console.log('should rename');
        const newPath = fullPath.replace(/\.js$/, '.jsx');
        fs.renameSync(fullPath, newPath);
        console.log(`Renamed ${fullPath} to ${newPath}`);
      }
    }
  });
}

// Run on your src folder or wherever your files are
walkDir('./src');
