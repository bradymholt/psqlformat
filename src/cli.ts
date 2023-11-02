import * as yargs from "yargs";
import { formatFiles } from "./index";
import { IOptions, CaseOptionEnum } from "./options";

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
        describe: "Edit files in-place. (Beware!)",
      },
      spaces: {
        type: "number",
        default: 4,
        describe: "Number of spaces to indent the code",
      },
      tabs: {
        type: "boolean",
        describe: "Use tabs instead of spaces (spaces option is ignored)",
      },
      maxLength: {
        type: "number",
        describe: "Maximum length of a query",
      },
      commaStart: {
        type: "boolean",
        describe: "Use preceding comma in parameter list",
      },
      commaBreak: {
        type: "boolean",
        describe: "In insert statement, add a newline after each comma",
      },
      commaEnd: {
        type: "boolean",
        default: true,
        describe: "Use trailing comma in parameter list",
      },
      noComment: {
        type: "boolean",
        describe: "Remove any comments",
      },
      noGrouping: {
        type: "boolean",
        default: false,
        describe: "Add a newline between statements in transaction regroupement",
      },
      functionCase: {
        type: "string",
        default: "unchanged",
        choices: ["unchanged", "lowercase", "uppercase", "capitalize"],
        describe: "Case to use for function names",
      },
      keywordCase: {
        type: "string",
        default: "uppercase",
        choices: ["unchanged", "lowercase", "uppercase", "capitalize"],
        describe: "Case to use for reserved keywords",
      },
      typeCase: {
        type: "string",
        default: "lowercase",
        choices: ["unchanged", "lowercase", "uppercase", "capitalize"],
        describe: "Case to use for data type names",
      },
      formatType: {
        type: "boolean",
        describe: "Use another formatting type for some statements",
      },
      wrapLimit: {
        type: "number",
        describe: "Wrap queries at a certain length",
      },
      wrapComment: {
        type: "boolean",
        describe: "When wrapLimit is true, apply formatting to comments",
      },
      placeholder: {
        type: "string",
        describe: "Regex to find code that must not be changed",
      },
      extraFunction: {
        type: "string",
        describe: "Path to file containing a list of function names",
      },
      noSpaceFunction: {
        type: "boolean",
        describe: "Remove the space character between a function call and the open parenthesis that follows",
      },
      configFile: {
        type: "string",
        describe: "Specify a pg_format config file",
      },
      perlBinPath: {
        type: "string",
        default: "perl",
        describe: "The path to the perl executable",
      },
      pgFormatterPath: {
        type: "string",
        describe: "Path to a custom pg_format version",
      },
      keepNewline: {
        type: "boolean",
        describe: "Preserve empty lines",
        default: false,
      },
      noExtraLine: {
        type: "boolean",
        describe: "Do not add an extra empty line at end of formatted output",
      },
      chunkSize: {
        type: "number",
        describe: "How many files to pass to pgFormatter at once",
        default: "25",
      },
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
  exec,
};
