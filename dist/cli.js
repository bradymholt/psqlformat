"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const index_1 = require("./index");
const options_1 = require("./options");
function exec(args, writeOutput = console.log) {
    let parsedArguments = yargs(args)
        .usage(`
Usage: $0 [options] <file/glob ...>

By default, output is written to stdout. (use --write option to edit files in-place)
`)
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
    })
        .demandCommand(1, "").argv;
    const filesOrGlobs = parsedArguments._;
    const options = parsedArguments;
    // Convert option strings to enums
    if (parsedArguments.functionCase != null) {
        options.functionCase = options_1.CaseOptionEnum[parsedArguments.functionCase];
    }
    if (parsedArguments.keywordCase != null) {
        options.keywordCase = options_1.CaseOptionEnum[parsedArguments.keywordCase];
    }
    index_1.default(filesOrGlobs, options, writeOutput);
}
exports.default = {
    exec
};
