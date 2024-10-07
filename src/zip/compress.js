import { createReadStream, createWriteStream } from "fs";
import { pipeline } from "stream/promises";
import { createGzip } from "zlib";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { styleText } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = join(__dirname, "files", "fileToCompress.txt");
const archive = join(__dirname, "files", "archive.gz");

const compress = async () => {
  const readStream = createReadStream(file);
  const writeStream = createWriteStream(archive);
  const gzip = createGzip();

  try {
    await pipeline(readStream, gzip, writeStream);
    process.stdout.write(styleText("green", `File successfully compressed to ${archive}`));
  } catch (error) {
    process.stderr.write(styleText("red", error + "\n"));
  }
};

await compress();
