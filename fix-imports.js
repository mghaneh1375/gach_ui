const fs = require('fs');
const path = require('path');

function fixImportsInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Regex to find import statements that might need .jsx extension
    const importRegex =
      /(import\s+(?:\{[^}]*\}|\*|\w+)\s+from\s+['"])([^'"]+)(['"];?)/g;
    const requireRegex = /(const\s+\w+\s*=\s*require\(['"])([^'"]+)(['"]\));?/g;

    let newContent = content;
    let hasChanges = false;

    // Function to process each import match
    const processImport = (match, prefix, importPath, suffix) => {
      // Skip if already has an extension
      if (importPath.match(/\.(jsx|js|tsx|ts|css|scss|sass|less|json)$/)) {
        return match;
      }

      // Skip node_modules and package imports
      if (!importPath.startsWith('.') && !importPath.startsWith('@')) {
        return match;
      }

      if (
        importPath.startsWith('@') &&
        importPath.indexOf('styles') === -1 &&
        importPath.indexOf('App') === -1 &&
        importPath.indexOf('api') === -1 &&
        importPath.indexOf('components') === -1 &&
        importPath.indexOf('services') === -1 &&
        importPath.indexOf('translator') === -1
      )
        return match;

      // Check if the last part starts with uppercase (likely a component)
      const parts = importPath.split('/');
      const lastPart = parts[parts.length - 1];

      // Skip if it's a relative path that starts with lowercase (likely not a component)
      if (lastPart && lastPart.length > 0 && /[a-z]/.test(lastPart.charAt(0))) {
        return match;
      }

      if (lastPart && lastPart.length > 0 && /[A-Z]/.test(lastPart.charAt(0))) {
        hasChanges = true;
        return `${prefix}${importPath}.jsx${suffix}`;
      }

      return match;
    };

    // Process import statements
    newContent = newContent.replace(importRegex, processImport);
    newContent = newContent.replace(requireRegex, processImport);

    if (hasChanges) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(
        `✅ Fixed imports in: ${path.relative(process.cwd(), filePath)}`,
      );
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function walkDirectory(dir) {
  let fixedCount = 0;

  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Skip node_modules and other non-source directories
        if (item !== 'node_modules' && !item.startsWith('.')) {
          fixedCount += walkDirectory(fullPath);
        }
      } else if (stat.isFile()) {
        // Process JavaScript/TypeScript files
        if (item.endsWith('.jsx')) {
          if (fixImportsInFile(fullPath)) {
            fixedCount++;
          }
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error reading directory ${dir}:`, error.message);
  }

  return fixedCount;
}

// Main execution
console.log('🚀 Starting import fix...\n');

const srcPath = path.join(process.cwd(), 'src');
if (!fs.existsSync(srcPath)) {
  console.error('❌ src directory not found!');
  process.exit(1);
}

const totalFixed = walkDirectory(srcPath);

console.log(`\n🎉 Done! Fixed imports in ${totalFixed} files.`);

// Also check root JS files
const rootFiles = fs
  .readdirSync(process.cwd())
  .filter(
    file =>
      file.endsWith('.js') ||
      file.endsWith('.jsx') ||
      file.endsWith('.ts') ||
      file.endsWith('.tsx'),
  );

let rootFixed = 0;
for (const file of rootFiles) {
  if (fixImportsInFile(path.join(process.cwd(), file))) {
    rootFixed++;
  }
}

if (rootFixed > 0) {
  console.log(`✅ Also fixed ${rootFixed} root directory files.`);
}
