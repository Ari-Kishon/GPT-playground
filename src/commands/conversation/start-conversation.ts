import { OpenAIApi } from "openai";
import { colorPrint } from "../../helpers";

export const startConversation = async (
  openai: OpenAIApi,
  char1: string = "Goku",
  char2: string = "Batman"
) => {
  let prompt = `A conversation between ${char1} and ${char2}.`;
  while (true) {
    for (const character of [char1, char2]) {
      prompt = prompt + `\n${character}:`;
      const { data } = await openai.createCompletion({
        model: "text-davinci-002",
        prompt,
        stop: ["\n"],
        temperature: 1,
        max_tokens: 4000,
      });
      if (data.choices) {
        const result = data.choices[0].text;
        prompt += result;
        colorPrint("FgRed", `${character}: ${result}`);
        colorPrint("BgYellow", prompt);
      }
    }
  }
};
