import { cp, access } from "node:fs/promises";

import { dirname } from "path";
import { fileURLToPath } from "url";

import { styleText } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const folderStartName = "/files";
const folderDesctinationName = "/files_copy";

const checkExistingPath = async (folderName) => {
  try {
    return await access(__dirname + folderName)
      .then(() => true)
      .catch(() => false);
  } catch (error) {
    process.stderr.write(styleText("red", error + "\n"));
  }
};

const copy = async () => {
  try {
    const isStartFolder = await checkExistingPath(folderStartName);
    const isDesctinationFolder = await checkExistingPath(folderDesctinationName);

    if (!isStartFolder || isDesctinationFolder) throw new Error("FS operation failed");

    await cp(__dirname + folderStartName, __dirname + folderDesctinationName, {
      recursive: true,
      errorOnExist: true,
    });
  } catch (error) {
    process.stderr.write(styleText("red", error + "\n"));
  }
};

await copy();
