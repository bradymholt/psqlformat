"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCommandArguments = exports.buildCommand = exports.CaseOptionEnum = exports.formatSql = exports.formatFiles = void 0;
const path = require("path");
const fs = require("fs");
const globby = require("globby");
const child_process_1 = require("child_process");
/**
 *
 * @param fileOrGlob The file path or glob to use (i.e. /tmp/query.sql or *.sql)
 * @param options
 */
function formatFiles(filesOrGlobs, editInPlace, options = {}, log = console.log) {
    let paths = globby.sync(filesOrGlobs);
    let formatted = "";
    for (let path of paths) {
        let startTime = process.hrtime();
        let command = `${buildCommand(options)} ${path}`;
        // Run pgFormatter
        let output = child_process_1.execSync(command, {
            encoding: "utf8"
        });
        const elapsedTimeMs = Math.round(process.hrtime(startTime)[1] / 1000000);
        formatted += output;
        if (editInPlace) {
            // Override file with formatted SQL and log progress
            fs.writeFileSync(path, output);
            log(`${path} [${elapsedTimeMs}ms]`);
        }
    }
    return formatted;
}
exports.formatFiles = formatFiles;
/**
 * Format SQL
 * @param sqlText The SQL to be formatted
 * @param options
 */
function formatSql(sqlText, options = {}) {
    let command = buildCommand(options);
    // Pass sqlText in as stdin and run pgFormatter
    let formatted = child_process_1.execSync(command, {
        encoding: "utf8",
        input: sqlText
    });
    return formatted;
}
exports.formatSql = formatSql;
var options_1 = require("./options");
Object.defineProperty(exports, "CaseOptionEnum", { enumerable: true, get: function () { return options_1.CaseOptionEnum; } });
function buildCommand(options) {
    let pgFormatterPath = path.resolve(__dirname, "../vendor/pgFormatter/pg_format");
    let commandArgs = buildCommandArguments(options);
    return `${options.perlBinPath || "perl"} ${pgFormatterPath} ${commandArgs}`;
}
exports.buildCommand = buildCommand;
function buildCommandArguments(options) {
    let commandArgs = "";
    if (options.spaces) {
        commandArgs += ` --spaces ${options.spaces}`;
    }
    if (options.tabs) {
        commandArgs += ` --tabs`;
    }
    if (options.maxLength) {
        commandArgs += ` --maxlength ${options.maxLength}`;
    }
    if (options.commaStart) {
        commandArgs += " --comma-start";
    }
    else if (options.commaEnd) {
        commandArgs += " --comma-end";
    }
    if (options.commaBreak) {
        commandArgs += " --comma-break";
    }
    if (options.noComment) {
        commandArgs += " --nocomment";
    }
    if (options.functionCase != null) {
        commandArgs += ` --function-case ${options.functionCase}`;
    }
    if (options.noGrouping) {
        commandArgs += " --nogrouping";
    }
    if (options.keywordCase != null) {
        commandArgs += ` --keyword-case ${options.keywordCase}`;
    }
    if (options.formatType) {
        commandArgs += ` --format-type`;
    }
    if (options.wrapLimit) {
        commandArgs += ` --wrap-limit ${options.wrapLimit}`;
    }
    if (options.placeholder != null) {
        commandArgs += ` --placeholder '${options.placeholder}'`;
    }
    if (options.extraFunction != null) {
        commandArgs += ` --extra-function '${options.extraFunction}'`;
    }
    if (options.configFile != null) {
        commandArgs += ` --config '${options.configFile}'`;
    }
    return commandArgs;
}
exports.buildCommandArguments = buildCommandArguments;
