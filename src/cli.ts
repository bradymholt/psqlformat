import * as argv from "yargs";
import formatFiles from "./index";
import { IOptions, CaseOptionEnum } from "./options";
import { Options } from "yargs";

function run(args: any) {
  let yargs = argv
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
        describe: "In a parameters list, start with the comma"
      },
      commaEnd: {
        type: "boolean",
        default: true,
        describe: "In a parameters list, end with the comma"
      },
      noComment: {
        type: "boolean",
        default: false,
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
      perlBinPath: {
        type: "string",
        default: "perl",
        describe: "The path to the Perl executable"
      }
    }).argv;

  const filesOrGlobs = yargs._;
  const options: IOptions = <any>yargs;

  // Convert option strings to enums
  if (yargs.functionCase != null) {
    options.functionCase = CaseOptionEnum[<keyof typeof CaseOptionEnum>yargs.functionCase];
  }
  if (yargs.keywordCase != null) {
    options.keywordCase = CaseOptionEnum[<keyof typeof CaseOptionEnum>yargs.keywordCase];
  }

  formatFiles(filesOrGlobs, options, console.log);
}

export default {
  run
};
