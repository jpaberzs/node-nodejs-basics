import { Transform } from "node:stream";

const transform = async () => {
  const reverseTransform = new Transform({
    transform(chunk, encoding, callback) {
      const reversedChunk = chunk.toString().split("").reverse().join("");
      callback(null, reversedChunk);
    },
  });

  process.stdin.pipe(reverseTransform).pipe(process.stdout);

  process.stdin.on("data", () => {
    reverseTransform.end();
    reverseTransform.on("finish", () => process.exit());
  });
};
await transform();
