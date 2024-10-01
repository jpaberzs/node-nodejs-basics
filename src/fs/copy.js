import fs from "node:fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const folderName = "files_copy";

const copy = async () => {
  try {
    fs.mkdirSync(__dirname);
  } catch (error) {
    throw new Error(error).message;
  }
};

await copy();
