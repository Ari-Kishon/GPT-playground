import { OpenAIApi } from "openai";
import { colorPrint } from "../../helpers";

export const startConversation = async (
  openai: OpenAIApi,
  char1: string = "Goku",
  char2: string = "Batman"
) => {
  let prompt = `A conversation between ${char1} and ${char2}.`;
  while (true) {
    prompt = prompt + `\n${char1}:`;
    const { data } = await openai.createCompletion({
      model: "text-davinci-002",
      prompt,
      stop: ["\n"],
      temperature: 1,
      max_tokens: 4000,
    });

    if (data.choices) {
      if (data.choices[0].text) {
        prompt += data.choices[0].text;
        colorPrint("FgRed", `${char1}: ${data.choices[0].text}`);
      }
    }
    prompt = prompt + `\n${char2}:`;
    const response2 = await openai.createCompletion({
      model: "text-davinci-002",
      prompt,
      stop: ["\n"],
      temperature: 1,
      max_tokens: 4000,
    });
    if (response2.data.choices) {
      if (response2.data.choices[0].text) {
        prompt += response2.data.choices[0].text;
        colorPrint("FgCyan", `${char2}: ${response2.data.choices[0].text}`);
      }
    }
  }
};
