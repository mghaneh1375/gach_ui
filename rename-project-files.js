const fs = require('fs');
const path = require('path');

// 🧠 Utility: Capitalize or lowercase first letter
const upperFirst = str => str.charAt(0).toUpperCase() + str.slice(1);
const lowerFirst = str => str.charAt(0).toLowerCase() + str.slice(1);

// 🔁 Rename logic
function renameProperly(filePath) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath);
  const ext = path.extname(filePath);
  const nameWithoutExt = path.basename(base, ext);

  let newName;

  if (ext === '.jsx') {
    newName = upperFirst(nameWithoutExt) + ext;
  } else {
    newName = lowerFirst(nameWithoutExt) + ext;
  }

  const newPath = path.join(dir, newName);
  if (newPath !== filePath) {
    fs.renameSync(filePath, newPath);
    console.log(`✅ Renamed file: ${filePath} → ${newPath}`);
  }

  return newPath;
}

// 📂 Rename folders and files recursively
function walkAndRename(dir) {
  const entries = fs.readdirSync(dir);

  for (let entry of entries) {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const newFolderName = lowerFirst(entry);
      const newFolderPath = path.join(dir, newFolderName);
      if (newFolderPath !== fullPath) {
        fs.renameSync(fullPath, newFolderPath);
        console.log(`📁 Renamed folder: ${fullPath} → ${newFolderPath}`);
        walkAndRename(newFolderPath); // Recurse renamed dir
      } else {
        walkAndRename(fullPath); // Recurse
      }
    } else {
      renameProperly(fullPath);
    }
  }
}

// ✅ Start here
walkAndRename(path.join(__dirname, 'src')); // Change 'src' if needed
