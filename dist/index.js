"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const globby = require("globby");
const child_process_1 = require("child_process");
function buildCommand(options) {
    let pgFormatterPath = path.resolve(__dirname, "../vendor/pgFormatter/pg_format");
    let commandArgs = buildCommandArguments(options);
    return `${options.perlBinPath} ${pgFormatterPath} ${commandArgs}`;
}
function buildCommandArguments(options) {
    let commandArgs = "";
    if (options.anonymize) {
        commandArgs += " --anonymize";
    }
    if (options.commaStart) {
        commandArgs += " --comma-start";
    }
    else if (options.commaEnd) {
        commandArgs += " --comma-end";
    }
    if (options.functionCase != null) {
        commandArgs += ` --function-case ${options.functionCase}`;
    }
    if (options.maxLength) {
        commandArgs += ` --maxlength ${options.maxLength}`;
    }
    if (options.noComment) {
        commandArgs += " --nocomment";
    }
    if (options.placeholder) {
        commandArgs += ` --placeholder ${options.placeholder}`;
    }
    if (options.spaces) {
        commandArgs += ` --spaces ${options.spaces}`;
    }
    if (options.separator) {
        commandArgs += ` --separator \\${options.separator}`;
    }
    if (options.keywordCase != null) {
        commandArgs += ` --keyword-case ${options.keywordCase}`;
    }
    return commandArgs;
}
exports.buildCommandArguments = buildCommandArguments;
/**
 *
 * @param fileOrGlob The file path or glob to use (i.e. /tmp/query.sql or *.sql)
 * @param options
 */
function formatFiles(filesOrGlobs, options, writeOutput) {
    let paths = globby.sync(filesOrGlobs);
    for (let path of paths) {
        let startTime = process.hrtime();
        let command = `${buildCommand(options)} ${path}`;
        // Run pgFormatter
        let formatted = child_process_1.execSync(command, {
            encoding: "utf8"
        });
        const elapsedTimeMs = Math.round(process.hrtime(startTime)[1] / 1000000);
        if (options.write) {
            fs.writeFileSync(path, formatted);
            writeOutput(`${path} ${elapsedTimeMs}ms`);
        }
        else {
            writeOutput(formatted);
        }
    }
}
exports.default = formatFiles;
/**
 * Format SQL
 * @param sqlText The SQL to be formatted
 * @param options
 */
function formatSql(sqlText, options) {
    let command = buildCommand(options);
    // Pass sqlText in as stdin and run pgFormatter
    let formatted = child_process_1.execSync(command, {
        encoding: "utf8",
        input: sqlText
    });
    return formatted;
}
exports.formatSql = formatSql;
