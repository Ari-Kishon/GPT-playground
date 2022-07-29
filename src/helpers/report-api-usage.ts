import { colorPrint } from "./color-print";

export const reportApiUsage = (headers: any) => {
  colorPrint("BgYellow", headers);
};
