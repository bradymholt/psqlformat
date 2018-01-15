"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yargs = require("yargs");
const index_1 = require("./index");
const options_1 = require("./options");
function exec(args, log = console.log) {
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
            describe: "Use preceding comma in parameter list"
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
        perlBinPath: {
            type: "string",
            default: "perl",
            describe: "The path to the perl executable"
        }
    })
        .demandCommand(1, "").argv;
    const filesOrGlobs = parsedArguments._;
    const write = parsedArguments.write;
    const options = parsedArguments;
    // Convert option strings to enums
    if (parsedArguments.functionCase != null) {
        options.functionCase = options_1.CaseOptionEnum[parsedArguments.functionCase];
    }
    if (parsedArguments.keywordCase != null) {
        options.keywordCase = options_1.CaseOptionEnum[parsedArguments.keywordCase];
    }
    let output = index_1.formatFiles(filesOrGlobs, write, options, log);
    if (!write) {
        log(output);
    }
}
exports.default = {
    exec
};
