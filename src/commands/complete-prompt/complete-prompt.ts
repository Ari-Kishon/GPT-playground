import { CreateCompletionRequest, OpenAIApi } from "openai";
import { asyncQuestion, colorPrint } from "../../helpers";
import readLine from "readline";

interface ICompletePrompt {
  openai: OpenAIApi;
  requestOptions: CreateCompletionRequest;
}
export const completePrompt = async ({
  openai,
  requestOptions,
}: ICompletePrompt) => {
  const { data } = await openai.createCompletion(requestOptions);
  if (data.choices) {
    return data.choices.map(({ text }) => text);
  }
};
