import readLine from "readline";
import { CreateCompletionRequest, OpenAIApi } from "openai";
import { completePrompt } from "../complete-prompt";
import { colorPrint, asyncQuestion } from "../../helpers";

interface IAskQuestion {
  openai: OpenAIApi;
  requestOptions: CreateCompletionRequest;
}

export const askQuestion = async ({ openai, requestOptions }: IAskQuestion) => {
  const readline = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  let prompt = "";
  colorPrint("BgMagenta", "Start your conversation!");
  while (true) {
    const answer = await asyncQuestion(readline);
    prompt += answer;
    requestOptions.prompt = prompt;
    const results = await completePrompt({ openai, requestOptions });
    if (results) {
      colorPrint("FgCyan", results[0]);
      prompt += results[0] ?? "";
      prompt += "\n";
    }
  }
};
