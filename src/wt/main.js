import { Worker } from "node:worker_threads";
import { availableParallelism } from "node:os";

import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workerFile = join(__dirname, "worker.js");

const performCalculations = async () => {
  const START_NUM = 10;
  const corsLength = availableParallelism();

  const results = Array.from({ length: corsLength }, (_, i) => {
    return new Promise((resolve) => {
      const worker = new Worker(workerFile);
      const numberToSend = START_NUM + i;

      worker.postMessage(numberToSend);

      worker.on("message", (data) => {
        resolve(data);
        worker.terminate();
      });

      worker.on("error", (error) => {
        resolve(error);
        worker.terminate();
      });
    });
  });

  const finalResults = await Promise.all(results);
  console.log(finalResults);
};

await performCalculations();
