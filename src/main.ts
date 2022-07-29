import dotenv from "dotenv";
import { Configuration, CreateCompletionRequest, OpenAIApi } from "openai";
import { completePrompt, startConversation } from "./commands";
import { colorPrint } from "./helpers";

const ORGANIZATION = "org-1uS68ddLJyWT1b7WPjpGVkNJ";
dotenv.config();

const prompt = "Explain the lore of Dragon Ball Z's most recent arc to me";
const requestOptions: CreateCompletionRequest = {
  model: "text-davinci-002",
  prompt,
  max_tokens: 4000,
  temperature: 1,
};

(async function main() {
  const apiKey = process.env["OPENAI_TOKEN"];
  const configuration = new Configuration({
    organization: ORGANIZATION,
    apiKey,
  });
  const openai = new OpenAIApi(configuration);
  await startConversation(openai);
  //   const results = await completePrompt(openai, requestOptions);
  //   if (results) {
  //     colorPrint("FgRed", prompt);
  //     colorPrint("FgCyan", results[0]);
  //   }
})();
