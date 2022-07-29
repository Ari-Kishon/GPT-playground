import { OpenAIApi } from "openai";
import { colorPrint } from "../../helpers";

export const startConversation = async (
  openai: OpenAIApi,
  char1: string = "Goku",
  char2: string = "Batman"
) => {
  let prompt = `A conversation between ${char1} and ${char2}.`;
  const characters = [char1, char2];
  while (true) {
    for (const character of characters) {
      prompt = prompt + `\n${character}:`;
      const {
        data: { choices },
      } = await openai.createCompletion({
        model: "text-davinci-002",
        prompt,
        stop: [char1, char2],
        temperature: 0.5,
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
