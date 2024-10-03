import { createReadStream } from "fs";
import { createHash } from "node:crypto";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { styleText } from "util";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filename = join(__dirname, "files", "fileToCalculateHashFor.txt");

const calculateHash = async () => {
  const hash = createHash("sha256");
  const input = createReadStream(filename);

  input.on("data", (chunk) => {
    hash.update(chunk);
  });

  input.on("end", () => {
    const digest = hash.digest("hex");

    process.stdout.write(`${digest} \n${filename}\n`);
  });

  input.on("error", (err) => {
    process.stderr.write(styleText("red", `${err} 123123\n`));
  });
};

await calculateHash();
