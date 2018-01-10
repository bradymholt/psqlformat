#!/usr/bin/env node
import * as argv from "yargs";
import formatFiles from "./index";
import { IOptions } from "./options";
import { Options } from "yargs";

// version
let yargs = argv
  .usage(
    `Usage: $0 [options] <file/glob ...>

By default, output is written to stdout. (use --write option to edit files in-place)
`
  )
  .options({
    write: {
      type: "boolean",
      describe: "Edit files in-place. (Beware!)"
    },
    anonymize: {
      type: "boolean",
      describe:
        "Obscure all literals in queries, useful to hide confidential data before formatting"
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
    functionCase: {
      type: "string",
      default: "unchanged",
      choices: ["unchanged", "lowercase", "uppercase", "capitalize"],
      describe: "Case of the function names"
    },
    maxLength: {
      type: "number",
      describe: "Maximum length of a query"
    },
    noComment: {
      type: "boolean",
      default: false,
      describe: "Remove any comments"
    },
    placeholder: {
      type: "string",
      default: null,
      describe: "Regex to find code that must not be changed"
    },
    spaces: {
      type: "number",
      default: 4,
      describe: "Number of spaces to indent the code"
    },
    separator: {
      type: "string",
      default: "'",
      describe: "Dynamic code separator"
    },
    keywordCase: {
      type: "number",
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

const options = <any>yargs;
let result = formatFiles(options._, <IOptions>options);
