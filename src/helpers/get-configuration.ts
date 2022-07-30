import dotenv from "dotenv";
import { Configuration } from "openai";

export const getConfiguration = () => {
  dotenv.config();
  const ORGANIZATION = "org-1uS68ddLJyWT1b7WPjpGVkNJ";
  const apiKey = process.env["OPENAI_TOKEN"];
  return new Configuration({
    organization: ORGANIZATION,
    apiKey,
  });
};
