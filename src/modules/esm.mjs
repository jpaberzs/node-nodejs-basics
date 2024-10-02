import { readFile } from "fs/promises";
import { dirname, join, sep } from "path";
import { fileURLToPath } from "url";
import { release, version } from "node:os";
import { createServer as createServerHttp } from "https";

import "./files/c.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const random = Math.random();

const a = await readFile(join(__dirname, "files", "a.json"), "utf-8");
const b = await readFile(join(__dirname, "files", "b.json"), "utf-8");

process.stdout.write(`Release ${release()} \n`);
process.stdout.write(`Version ${version()} \n`);
process.stdout.write(`Path segment separator is "${sep}" \n`);

process.stdout.write(`Path to current file is ${__filename} \n`);
process.stdout.write(`Path to current directory is ${__dirname} \n`);

const myServer = createServerHttp((_, res) => {
  res.end("Request accepted");
});

const PORT = 3000;

process.stdout.write((random > 0.5 ? a : b) + "\n");

myServer.listen(PORT, () => {
  process.stdout.write(`Server is listening on port ${PORT} \n`);
  process.stdout.write(`To terminate it, use Ctrl+C combination \n`);
});

// export { unknownObject, myServer };
