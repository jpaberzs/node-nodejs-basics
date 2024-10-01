import fs from "node:fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file = "fresh.txt";
const fileContent = "I am fresh and young";
const resultFile = __dirname + `/files/${file}`;

const create = async () => {
  try {
    if (fs.existsSync(resultFile)) throw new Error("FS operation failed").message;
    return fs.writeFileSync(resultFile, fileContent);
  } catch (error) {
    process.stderr.write(error + "\n");
  }
};

await create();
