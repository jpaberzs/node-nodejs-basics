import { createWriteStream } from "fs";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = join(__dirname, "files", "fileToWrite.txt");

const write = async () => {
  const stream = createWriteStream(file);

  process.stdout.write("Write your text: \n");
  process.stdin.on("data", (chunk) => {
    stream.write(chunk);
    process.exit();
  });
};

await write();
