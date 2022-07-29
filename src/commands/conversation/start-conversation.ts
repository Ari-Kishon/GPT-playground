import { OpenAIApi } from "openai";
import { colorPrint } from "../../helpers";

export const startConversation = async (
  openai: OpenAIApi,
  characters: string[] = ["Goku", "Glados"]
) => {
  let prompt = `A long conversation between ${characters[0]} and ${characters[1]}.`;
  while (true) {
    for (const character of characters) {
      prompt = prompt + `\n${character}:`;
      const {
        data: { choices },
      } = await openai.createCompletion({
        model: "text-davinci-002",
        prompt,
        stop: ["\n"],
        temperature: 1,
      });
      if (choices) {
        const result = choices[0].text;
        prompt += result;
        colorPrint(
          characters.indexOf(character) == 0 ? "FgRed" : "FgBlue",
          `${character}: ${result}`
        );
      }
    }
  }
};
