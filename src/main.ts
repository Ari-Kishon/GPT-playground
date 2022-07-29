import dotenv from "dotenv";
import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";
import { completePrompt } from "./commands";
import { colorPrint } from "./helpers";

const ORGANIZATION = "org-1uS68ddLJyWT1b7WPjpGVkNJ";
dotenv.config();

const prompt = "Batman is hungry and he misses his parents,";
const requestOptions: CreateCompletionRequest = {
  model: "text-davinci-002",
  prompt,
  max_tokens: 1000,
  temperature: 0,
};

(async function main() {
  const apiKey = process.env["OPENAI_TOKEN"];
  const configuration = new Configuration({
    organization: ORGANIZATION,
    apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const results = await completePrompt(openai, requestOptions);
  if (results) {
    colorPrint("FgRed", prompt);
    colorPrint("FgCyan", results[0]);
  }
})();
