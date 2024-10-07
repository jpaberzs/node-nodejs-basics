import { access, rename as renameFC } from "node:fs/promises";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { styleText } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = join(__dirname, "files", "wrongFilename.txt");
const currentFile = join(__dirname, "files", "properFilename.md");

const checkExistingFile = async (filePath) => {
  try {
    return await access(filePath)
      .then(() => true)
      .catch(() => false);
  } catch (error) {
    process.stderr.write(styleText("red", error + "\n"));
  }
};

const rename = async () => {
  try {
    const isWrongFileName = await checkExistingFile(file);
    const isProperFileName = await checkExistingFile(currentFile);

    if (!isWrongFileName || isProperFileName) throw new Error("FS operation failed");

    await renameFC(file, currentFile);
  } catch (error) {
    process.stderr.write(styleText("red", error + "\n"));
  }
};

await rename();
