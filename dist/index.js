"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const fs = require("fs");
const globby = require("globby");
const child_process_1 = require("child_process");
/**
 *
 * @param fileOrGlob The file path or glob to use (i.e. /tmp/query.sql or *.sql)
 * @param options
 */
function formatFiles(filesOrGlobs, options = {}, log = console.log) {
    let paths = globby.sync(filesOrGlobs);
    let output = "";
    for (let path of paths) {
        let startTime = process.hrtime();
        let command = `${buildCommand(options)} ${path}`;
        // Run psqlformat
        let formatted = child_process_1.execSync(command, {
            encoding: "utf8"
        });
        const elapsedTimeMs = Math.round(process.hrtime(startTime)[1] / 1000000);
        output += formatted;
        if (options.write) {
            // Override file with formatted SQL and log progress
            fs.writeFileSync(path, formatted);
            log(`${path} [${elapsedTimeMs}ms]`);
        }
    }
    return output;
}
exports.formatFiles = formatFiles;
/**
 * Format SQL
 * @param sqlText The SQL to be formatted
 * @param options
 */
function formatSql(sqlText, options = {}) {
    let command = buildCommand(options);
    // Pass sqlText in as stdin and run psqlformat
    let formatted = child_process_1.execSync(command, {
        encoding: "utf8",
        input: sqlText
    });
    return formatted;
}
exports.formatSql = formatSql;
function buildCommand(options) {
    let psqlformatPath = path.resolve(__dirname, "../vendor/psqlformat/pg_format");
    let commandArgs = buildCommandArguments(options);
    return `${options.perlBinPath || "perl"} ${psqlformatPath} ${commandArgs}`;
}
exports.buildCommand = buildCommand;
function buildCommandArguments(options) {
    let commandArgs = "";
    if (options.spaces) {
        commandArgs += ` --spaces ${options.spaces}`;
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
    if (options.noComment) {
        commandArgs += " --nocomment";
    }
    if (options.functionCase != null) {
        commandArgs += ` --function-case ${options.functionCase}`;
    }
    if (options.keywordCase != null) {
        commandArgs += ` --keyword-case ${options.keywordCase}`;
    }
    return commandArgs;
}
exports.buildCommandArguments = buildCommandArguments;
