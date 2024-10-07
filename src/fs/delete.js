import { access, unlink } from "node:fs/promises";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { styleText } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = join(__dirname, "files", "fileToRemove.txt");

const remove = async () => {
  try {
    const isFileExist = await access(file)
      .then(() => true)
      .catch(() => false);

    if (!isFileExist) throw Error("FS operation failed");

    await unlink(file);
  } catch (error) {
    process.stderr.write(styleText("red", error + "\n"));
  }
};

await remove();
