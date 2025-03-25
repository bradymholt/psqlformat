"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildCommandArguments = exports.buildCommand = exports.CaseOptionEnum = exports.formatSql = exports.formatFiles = void 0;
const path = require("path");
const globby = require("globby");
const child_process_1 = require("child_process");
const options_1 = require("./options");
/**
 *
 * @param fileOrGlob The file path or glob to use (i.e. /tmp/query.sql or *.sql)
 * @param options
 */
function formatFiles(filesOrGlobs, editInPlace, options = {}, log = console.log) {
    var _a;
    // both the editInPlace and options.write properties mean the same thing, ensure they're aligned here
    editInPlace = (_a = editInPlace !== null && editInPlace !== void 0 ? editInPlace : options.write) !== null && _a !== void 0 ? _a : false;
    options.write = editInPlace;
    const paths = globby.sync(filesOrGlobs);
    let formatted = "";
    const chunkSize = Number(options.chunkSize || 25);
    for (let i = 0; i < paths.length; i += chunkSize) {
        const pathsChunk = paths.slice(i, i + chunkSize);
        const filenamesWrapped = `"${pathsChunk.join('" "')}"`;
        const startTime = process.hrtime();
        const command = `${buildCommand(options)} ${filenamesWrapped}`;
        // Run pgFormatter
        const output = child_process_1.execSync(command, {
            encoding: "utf8",
        });
        const elapsedTimeMs = Math.round(process.hrtime(startTime)[1] / 1000000);
        formatted += output;
        if (editInPlace) {
            const filesOnNewLines = pathsChunk.map((p) => `  ${p}`);
            log(`[${pathsChunk.length} files in ${elapsedTimeMs}ms]:\n${filesOnNewLines.join("\n")}\n`);
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
        input: sqlText,
    });
    return formatted;
}
exports.formatSql = formatSql;
var options_2 = require("./options");
Object.defineProperty(exports, "CaseOptionEnum", { enumerable: true, get: function () { return options_2.CaseOptionEnum; } });
function buildCommand(options) {
    let pgFormatterPath = options.pgFormatterPath || path.resolve(__dirname, "../vendor/pgFormatter/pg_format");
    let commandArgs = buildCommandArguments(options);
    return `${options.perlBinPath || "perl"} ${pgFormatterPath} ${commandArgs}`;
}
exports.buildCommand = buildCommand;
function buildCommandArguments(options) {
    let commandArgs = "";
    if (options.write) {
        commandArgs += ` --inplace`;
    }
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
        commandArgs += ` --function-case ${!isNaN(Number(options.functionCase)) ? options.functionCase : options_1.CaseOptionEnum[options.functionCase]}`;
    }
    if (options.noGrouping) {
        commandArgs += " --nogrouping";
    }
    if (options.keywordCase != null) {
        commandArgs += ` --keyword-case ${!isNaN(Number(options.keywordCase)) ? options.keywordCase : options_1.CaseOptionEnum[options.keywordCase]}`;
    }
    if (options.typeCase != null) {
        commandArgs += ` --type-case ${!isNaN(Number(options.typeCase)) ? options.typeCase : options_1.CaseOptionEnum[options.typeCase]}`;
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
    if (options.noSpaceFunction) {
        commandArgs += " --no-space-function";
    }
    if (options.configFile != null) {
        commandArgs += ` --config '${options.configFile}'`;
    }
    if (options.noExtraLine) {
        commandArgs += " --no-extra-line";
    }
    if (options.wrapComment) {
        commandArgs += " --wrap-comment";
    }
    if (options.keepNewline) {
        commandArgs += " --keep-newline";
    }
    return commandArgs;
}
exports.buildCommandArguments = buildCommandArguments;
