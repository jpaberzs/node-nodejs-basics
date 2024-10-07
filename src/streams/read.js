import { createReadStream } from "fs";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = join(__dirname, "files", "fileToRead.txt");

const read = async () => {
  const stream = createReadStream(file);

  stream.on("data", (chunk) => {
    process.stdout.write(`${chunk.toString("utf8")} \n`);
  });
};

await read();
