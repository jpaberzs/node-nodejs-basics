import { Worker } from "node:worker_threads";
import { availableParallelism } from "node:os";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerFile = join(__dirname, "worker.js");

const performCalculations = async () => {
  return new Promise((resolve) => {
    const START_NUM = 10;

    const corsLength = availableParallelism();
    const workers = [];
    const results = new Array(corsLength);

    let completedWorkers = 0;

    for (let i = 0; i < corsLength; i++) {
      const worker = new Worker(workerFile);

      const numberToSend = START_NUM + i;

      worker.postMessage(numberToSend);

      worker.on("message", (data) => {
        results[i] = data;
        completedWorkers++;

        if (completedWorkers === corsLength) resolve(results);

        worker.terminate();
      });

      worker.on("error", (error) => {
        results[i] = { status: "error", data: null };
        completedWorkers++;

        if (completedWorkers === corsLength) resolve(results);
      });

      worker.on("exit", (code) => {
        if (code !== 0) {
          results[i] = { status: "error", data: null };
          completedWorkers++;

          if (completedWorkers === corsLength) resolve(results);
        }
      });

      workers.push(worker);
    }
  });
};

await performCalculations()
  .then((results) => {
    console.log("Results from workers:", results);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });
