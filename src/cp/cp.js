import { spawn } from "node:child_process";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileName = join(__dirname, "files", "script.js");

const spawnChildProcess = async (args) => {
  const child = spawn("node", [fileName, ...args], {
    stdio: ["pipe", "pipe", "pipe"],
  });

  process.stdout.write(`Master Process: Spawned child process with PID ${child.pid} \n`);

  process.stdin.pipe(child.stdin);

  child.stdout.pipe(process.stdout);

  child.stderr.pipe(process.stderr);

  child.on("exit", (code, signal) => {
    if (code !== null) {
      process.stdout.write(`Master Process: Child process exited with code ${code} \n`);
    } else {
      process.stdout.write(`Master Process: Child process was killed by signal ${signal} \n`);
    }
  });

  child.on("error", (err) => {
    process.stderr.write("Master Process: Failed to start child process.", err, "\n");
  });
};

// Put your arguments in function call to test this functionality
const args = ["a", "b", "c", "d", "e", "f"];
spawnChildProcess(args);
