import { CreateCompletionRequest, OpenAIApi } from "openai";

export const completePrompt = async (
  openai: OpenAIApi,
  requestOptions: CreateCompletionRequest
) => {
  const { data } = await openai.createCompletion(requestOptions);
  if (data.choices) {
    return data.choices.map(({ text }) => text);
  }
};
