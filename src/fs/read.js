import { readFile, access } from "node:fs/promises";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { styleText } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = join(__dirname, "files", "fileToRead.txt");

const read = async () => {
  try {
    const isExisting = await access(file)
      .then(() => true)
      .catch(() => false);

    if (!isExisting) throw new Error("FS operation failed");

    const content = await readFile(file, {
      encoding: "utf-8",
    });

    process.stderr.write(styleText("green", "File read successfully\n\n"));
    process.stderr.write(content + "\n");
  } catch (error) {
    process.stderr.write(styleText("red", error + "\n"));
  }
};

await read();
