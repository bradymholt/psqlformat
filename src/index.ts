import * as path from "path";
import * as fs from "fs";
import * as globby from "globby";
import { execSync } from "child_process";
import { IOptions } from "./options";

/**
 *
 * @param fileOrGlob The file path or glob to use (i.e. /tmp/query.sql or *.sql)
 * @param options
 */
export function formatFiles(
  filesOrGlobs: string | string[],
  editInPlace: boolean,
  options: IOptions = {},
  log: (text: string) => void = console.log
) {
  let paths = globby.sync(filesOrGlobs);
  let formatted = "";

  for (let path of paths) {
    let startTime = process.hrtime();
    let command = `${buildCommand(options)} ${path}`;
    // Run pgFormatter
    let output = execSync(command, {
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

/**
 * Format SQL
 * @param sqlText The SQL to be formatted
 * @param options
 */
export function formatSql(sqlText: string, options: IOptions = {}) {
  let command = buildCommand(options);
  // Pass sqlText in as stdin and run pgFormatter
  let formatted = execSync(command, {
    encoding: "utf8",
    input: sqlText
  });
  return formatted;
}

export { IOptions, CaseOptionEnum } from "./options";

export function buildCommand(options: IOptions) {
  let pgFormatterPath = path.resolve(__dirname, "../vendor/pgFormatter/pg_format");
  let commandArgs = buildCommandArguments(options);

  return `${options.perlBinPath || "perl"} ${pgFormatterPath} ${commandArgs}`;
}

export function buildCommandArguments(options: IOptions) {
  let commandArgs = "";

  if (options.spaces) {
    commandArgs += ` --spaces ${options.spaces}`;
  }

  if (options.maxLength) {
    commandArgs += ` --maxlength ${options.maxLength}`;
  }

  if (options.commaStart) {
    commandArgs += " --comma-start";
  } else if (options.commaEnd) {
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

  if (options.wrapLimit){
    commandArgs += ` --wrap-limit ${options.wrapLimit}`
  }

  if (options.placeholder != null) {
    commandArgs += ` --placeholder ${options.placeholder}`;
  }

  return commandArgs;
}
