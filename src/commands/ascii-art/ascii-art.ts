import { OpenAIApi } from "openai";
import { colorPrint } from "../../helpers";

export const asciiArt = async (openai: OpenAIApi, prompt: string) => {
  const {
    data: { choices },
  } = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `Ascii art of ${prompt.trim()}.`,
    max_tokens: 2_500,
    temperature: 0.4,
  });
  if (choices) {
    colorPrint("BgRed", `Ascii art of ${prompt.trim()}.`);
    const result = choices[0].text;
    colorPrint("BgWhite", result);
  }
};
