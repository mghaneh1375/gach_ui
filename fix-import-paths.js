// fix-import-casing.js
const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generate = require('@babel/generator').default;

const projectRoot = path.resolve(__dirname, 'src'); // Adjust to your root

// Helper: lowercases first char of string
function lowercaseFirstChar(str) {
  if (!str) return str;
  return str[0].toLowerCase() + str.slice(1);
}

// Check if a path segment starts with uppercase letter
function isUpperCaseStart(segment) {
  return /^[A-Z]/.test(segment);
}

// Fix the import path: lowercase folder names starting uppercase and
// lowercase the first letter of the filename if starts uppercase
function fixImportPath(importPath) {
  if (!importPath.startsWith('.')) {
    // Ignore non-relative imports (node_modules, aliases, etc.)
    return importPath;
  }

  // Normalize separators to posix style for splitting
  const normalized = importPath.replace(/\\/g, '/');

  const parts = normalized.split('/');

  // Process all but last segment (folders)
  for (let i = 0; i < parts.length - 1; i++) {
    if (isUpperCaseStart(parts[i])) {
      parts[i] = lowercaseFirstChar(parts[i]);
    }
  }

  // Process last segment (filename or folder)
  const last = parts[parts.length - 1];

  // Check if last segment is a filename with extension or no extension
  const ext = path.extname(last);

  let namePart = ext ? last.slice(0, -ext.length) : last;

  if (isUpperCaseStart(namePart)) {
    namePart = lowercaseFirstChar(namePart);
  }

  parts[parts.length - 1] = ext ? namePart + ext : namePart;

  // Rejoin and return normalized path
  let fixedPath = parts.join('/');

  // Remove extension for imports (optional; if you want to keep extensions, skip this)
  fixedPath = fixedPath.replace(/\.(js|jsx|ts|tsx)$/, '');

  // Ensure relative path starts with './' or '../'
  if (!fixedPath.startsWith('./') && !fixedPath.startsWith('../')) {
    fixedPath = './' + fixedPath;
  }

  return fixedPath;
}

// Recursively get all files in a directory (js, jsx, ts, tsx only)
function getAllFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, {withFileTypes: true});

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      getAllFiles(fullPath, files);
    } else if (/\.(js|jsx|ts|tsx)$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function processFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf8');

  let ast;
  try {
    ast = parser.parse(code, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'classProperties', 'decorators-legacy'],
    });
  } catch (e) {
    console.error(`Failed to parse ${filePath}: ${e.message}`);
    return;
  }

  let modified = false;

  traverse(ast, {
    ImportDeclaration({node}) {
      const oldPath = node.source.value;
      const fixedPath = fixImportPath(oldPath);
      console.log(`oldPath: ${oldPath}`);
      console.log(`fixedPath: ${fixedPath}`);
      if (fixedPath !== oldPath) {
        node.source.value = fixedPath;
        modified = true;
        console.log(`Fixed import in ${filePath}: ${oldPath} → ${fixedPath}`);
      }
    },
    CallExpression({node}) {
      // Handle dynamic requires: require('...')
      if (
        node.callee.type === 'Identifier' &&
        node.callee.name === 'require' &&
        node.arguments.length === 1 &&
        node.arguments[0].type === 'StringLiteral'
      ) {
        const oldPath = node.arguments[0].value;
        const fixedPath = fixImportPath(oldPath);
        if (fixedPath !== oldPath) {
          node.arguments[0].value = fixedPath;
          modified = true;
          console.log(
            `Fixed require in ${filePath}: ${oldPath} → ${fixedPath}`,
          );
        }
      }
    },
  });

  if (modified) {
    const output = generate(
      ast,
      {
        /* options */
      },
      code,
    );
    fs.writeFileSync(filePath, output.code, 'utf8');
  }
}

function main() {
  const allFiles = getAllFiles(projectRoot);
  console.log(`Found ${allFiles.length} files.`);

  for (const file of allFiles) {
    processFile(file);
  }
}

main();
