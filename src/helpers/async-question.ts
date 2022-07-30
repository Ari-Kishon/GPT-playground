import type readLine from "readline";

export const asyncQuestion = (readline: readLine.Interface) =>
  new Promise((resolve) =>
    readline.question("", (ans) => {
      resolve(ans);
    })
  );