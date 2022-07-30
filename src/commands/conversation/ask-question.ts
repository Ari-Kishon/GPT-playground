import readLine from "readline";
import { CreateCompletionRequest, OpenAIApi } from "openai";
import { completePrompt } from "../complete-prompt";
import { colorPrint } from "../../helpers";

interface IAskQuestion {
  openai: OpenAIApi;
  readline: readLine.Interface;
  requestOptions: CreateCompletionRequest;
  conversation?: string;
}

export const askQuestion = async ({
  readline,
  openai,
  requestOptions,
  conversation,
}: IAskQuestion) => {
  let prompt = "";
  colorPrint("BgMagenta", "Start your conversation!");
  while (true) {
    const answer = await asyncQuestion(readline);
    prompt += answer;
    requestOptions.prompt = prompt;
    const results = await completePrompt(openai, requestOptions);
    if (results) {
      colorPrint("FgCyan", results[0]);
      prompt += results[0] ?? "";
      prompt += "\n";
    }
  }
};

const asyncQuestion = (readline: readLine.Interface) =>
  new Promise((resolve) =>
    readline.question("", (ans) => {
      resolve(ans);
    })
  );
