import { constants } from "node:fs";
import { access, writeFile } from "node:fs/promises";

import { fileURLToPath } from "url";
import { dirname } from "path";

import { styleText } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file = "fresh.txt";
const fileContent = "I am fresh and young";
const resultFile = __dirname + `/files/${file}`;

const create = async () => {
  try {
    const isAccesed = await access(resultFile, constants.F_OK)
      .then(() => true)
      .catch(() => false);

    if (isAccesed) throw new Error("FS operation failed");

    await writeFile(resultFile, fileContent);
  } catch (error) {
    process.stderr.write(styleText("red", error + "\n"));
  }
};

await create();
