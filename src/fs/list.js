import { readdir, access } from "node:fs/promises";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { styleText } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const folder = join(__dirname, "files");

const list = async () => {
  try {
    const isExisting = await access(folder)
      .then(() => true)
      .catch(() => false);

    if (!isExisting) throw Error("FS operation failed");

    const allFiles = await readdir(folder);

    allFiles.forEach((file) => {
      process.stdout.write(file + "\n");
    });
  } catch (error) {
    process.stderr.write(styleText("red", error + "\n"));
  }
};

await list();
