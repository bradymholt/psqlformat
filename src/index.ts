import * as path from "path";
import * as fs from "fs";
import * as globby from "globby";
import { execSync } from "child_process";
import { IOptions, CaseOptionEnum } from "./options";

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
  let output = "";

  for (let path of paths) {
    let startTime = process.hrtime();
    let command = `${buildCommand(options)} ${path}`;
    // Run pgFormatter
    let formatted = execSync(command, {
      encoding: "utf8"
    });

    const elapsedTimeMs = Math.round(process.hrtime(startTime)[1] / 1000000);

    output += formatted;

    if (editInPlace) {
      // Override file with formatted SQL and log progress
      fs.writeFileSync(path, formatted);
      log(`${path} ${elapsedTimeMs}ms`);
    }
  }

  return output;
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

export { IOptions } from "./options";

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
