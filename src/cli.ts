/* eslint-disable no-console */
import { Command } from "commander";
import { CreateCompletionRequest, OpenAIApi } from "openai";
import { completePrompt, askQuestion, characterChat } from "./commands";
import { colorPrint, getConfiguration } from "./helpers";
import readLine from "readline";

const setFailureExitCode = (e: unknown) => {
  process.exitCode = 1;
  console.error(e);
};

process.on("uncaughtException", setFailureExitCode);
process.on("unhandledRejection", setFailureExitCode);

const configuration = getConfiguration();

const program = new Command();

program
  .command("complete")
  .arguments("<prompt>")
  .action(async (prompt: string) => {
    const requestOptions: CreateCompletionRequest = {
      model: "text-davinci-002",
      prompt,
      max_tokens: 1000,
      temperature: 0,
    };
    const openai = new OpenAIApi(configuration);
    const results = await completePrompt(openai, requestOptions);
    if (results) {
      colorPrint("FgRed", prompt);
      colorPrint("FgCyan", results[0]);
    }
  });

program
  .command("auto-chat")
  .arguments("<char1> <char2>")
  .action(async (char1: string, char2: string) => {
    const openai = new OpenAIApi(configuration);
    await characterChat(openai, char1, char2);
  });

program.command("talk").action(async () => {
  const requestOptions: CreateCompletionRequest = {
    model: "text-davinci-002",
    max_tokens: 1000,
    temperature: 0,
  };

  const openai = new OpenAIApi(configuration);
  const readline = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  await askQuestion({ openai, readline, requestOptions });
});

program.parseAsync().catch(setFailureExitCode);
