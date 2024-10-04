import { createReadStream, createWriteStream } from "fs";
import { access, writeFile } from "fs/promises";
import { pipeline } from "stream/promises";
import { createGunzip } from "zlib";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { styleText } from "node:util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = join(__dirname, "files", "fileToCompress.txt");
const archive = join(__dirname, "files", "archive.gz");

const decompress = async () => {
  const isAccesed = await access(file)
    .then(() => true)
    .catch(() => false);

  if (!isAccesed) {
    await writeFile(file, "");
  }

  const readStream = createReadStream(archive);
  const writeStream = createWriteStream(file);
  const gunzip = createGunzip();

  try {
    await pipeline(readStream, gunzip, writeStream);
    process.stdout.write(styleText("green", `File successfully decompressed to ${file}`));
  } catch (error) {
    process.stderr.write(styleText("red", error + "\n"));
  }
};

await decompress();
