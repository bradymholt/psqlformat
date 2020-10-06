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
        tabs: {
            type: "boolean",
            describe: "Use tabs instead of spaces (spaces option is ignored)"
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
        noGrouping: {
            type: "boolean",
            default: false,
            describe: "Add a newline between statements in transaction regroupement"
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
        wrapLimit: {
            type: "number",
            describe: "Wrap queries at a certain length"
        },
        placeholder: {
            type: "string",
            describe: "Regex to find code that must not be changed"
        },
        extraFunction: {
            type: "string",
            describe: "Path to file containing a list of function names"
        },
        configFile: {
            type: "string",
            describe: "Specify a pg_format config file",
        },
        perlBinPath: {
            type: "string",
            default: "perl",
            describe: "The path to the perl executable"
        },
        pgFormatterPath: {
            type: "string",
            describe: "Path to a custom pg_format version"
        }
    })
        .demandCommand(1, "").argv;
    const filesOrGlobs = parsedArguments._;
    const write = parsedArguments.write || false;
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
