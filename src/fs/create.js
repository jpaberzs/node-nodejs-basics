import fs from "node:fs";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file = "fresh.txt";
const fileContent = "I am fresh and young";

const create = async () => {
  try {
    if (fs.existsSync(__dirname + `/files/${file}`)) throw new Error("FS operation failed");
    fs.writeFileSync(__dirname + `/files/${file}`, fileContent);
  } catch (error) {
    console.error(error);
  }
};

await create();
