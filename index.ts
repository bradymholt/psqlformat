import * as path from "path";
import { execSync } from "child_process";

export default function format(text: string) {
  let pgFormatterPath = path.resolve(
    __dirname,
    "../vendor/pgFormatter/pg_format"
  );

  let command = `perl ${pgFormatterPath}`;

  let result = execSync(command, {
    encoding: "utf8",
    input: text
  });

  return result;
}
