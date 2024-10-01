import { readdir } from "node:fs/promises";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { styleText } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const folder = join(__dirname, "files");

const list = async () => {
  try {
    const allFiles = await readdir(folder);

    allFiles.forEach((file) => {
      process.stderr.write(file + "\n");
    });
  } catch (error) {
    process.stderr.write(styleText("red", error + "\n"));
  }
};

await list();
