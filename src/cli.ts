import * as yargs from "yargs";
import { formatFiles } from "./index";
import { IOptions, CaseOptionEnum } from "./options";
import { Options } from "yargs";

function exec(args: any, log: (text: string) => void = console.log) {
  let parsedArguments = yargs(args)
    .usage(
      `
Usage: $0 [options] <file/glob ...>

By default, output is written to stdout. (use --write option to edit files in-place)
`
    )
    .options({
      write: {
        type: "boolean",
        describe: "Edit files in-place. (Beware!)"
      },
      spaces: {
        type: "number",
        default: 4,
        describe: "Number of spaces to indent the code"
      },
      maxLength: {
        type: "number",
        describe: "Maximum length of a query"
      },
      commaStart: {
        type: "boolean",
        describe: "Use preceding comma in parameter list"
      },
      commaBreak: {
        type: "boolean",
        describe: "In insert statement, add a newline after each comma"
      },
      commaEnd: {
        type: "boolean",
        default: true,
        describe: "Use trailing comma in parameter list"
      },
      noComment: {
        type: "boolean",
        describe: "Remove any comments"
      },
      functionCase: {
        type: "string",
        default: "unchanged",
        choices: ["unchanged", "lowercase", "uppercase", "capitalize"],
        describe: "Case of the function names"
      },
      keywordCase: {
        type: "string",
        default: "uppercase",
        choices: ["unchanged", "lowercase", "uppercase", "capitalize"],
        describe: "Case of the reserved keywords"
      },
      formatType: {
        type: "boolean",
        describe: "Use another formatting type for some statements"
      },
      perlBinPath: {
        type: "string",
        default: "perl",
        describe: "The path to the perl executable"
      }
    })
    .demandCommand(1, "").argv;

  const filesOrGlobs = parsedArguments._;
  const write = parsedArguments.write || false;
  const options: IOptions = <any>parsedArguments;

  // Convert option strings to enums
  if (parsedArguments.functionCase != null) {
    options.functionCase = CaseOptionEnum[<keyof typeof CaseOptionEnum>parsedArguments.functionCase];
  }
  if (parsedArguments.keywordCase != null) {
    options.keywordCase = CaseOptionEnum[<keyof typeof CaseOptionEnum>parsedArguments.keywordCase];
  }

  let output = formatFiles(filesOrGlobs, write, options, log);
  if (!write) {
    log(output);
  }
}

export default {
  exec
};
