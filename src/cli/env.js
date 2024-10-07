import { styleText } from "node:util";

const parseEnv = () => {
  const rssVariables = Object.entries(process.env)
    .filter(([key, value]) => key.startsWith("RSS_"))
    .map(([key, value]) => `${key}=${value}`)
    .join("; ");

  process.stdout.write(styleText("green", rssVariables + "\n"));
};

parseEnv();
