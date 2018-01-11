import * as path from "path";
import * as fs from "fs";
import * as globby from "globby";
import { execSync } from "child_process";
import { IOptions, CaseOptionEnum } from "./options";

function buildCommand(options: IOptions) {
  let pgFormatterPath = path.resolve(
    __dirname,
    "../vendor/pgFormatter/pg_format"
  );
  let commandArgs = buildCommandArguments(options);

  return `${options.perlBinPath} ${pgFormatterPath} ${commandArgs}`;
}

function buildCommandArguments(options: IOptions) {
  let commandArgs = "";
  if (options.anonymize) {
    commandArgs += " --anonymize";
  }

  if (options.commaStart) {
    commandArgs += " --comma-start";
  } else if (options.commaEnd) {
    commandArgs += " --comma-end";
  }

  if (options.functionCase) {
    let functionCase =
      CaseOptionEnum[<keyof typeof CaseOptionEnum>options.functionCase];
    commandArgs += ` --function-case ${functionCase}`;
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

  if (options.keywordCase) {
    let keywordCase =
      CaseOptionEnum[<keyof typeof CaseOptionEnum>options.keywordCase];
    commandArgs += ` --keyword-case ${keywordCase}`;
  }

  return commandArgs;
}

/**
 *
 * @param fileOrGlob The file path or glob to use (i.e. /tmp/query.sql or *.sql)
 * @param options
 */
export default function formatFiles(fileOrGlob: string, options: IOptions) {
  let paths = globby.sync(fileOrGlob);

  for (let path of paths) {
    let startTime = process.hrtime();
    let command = `${buildCommand(options)} ${path}`;
    // Run pgFormatter
    let formatted = execSync(command, {
      encoding: "utf8"
    });

    const elapsedTimeMs = Math.round(process.hrtime(startTime)[1] / 1000000);

    if (options.write) {
      fs.writeFileSync(path, formatted);
      console.log(`${path} ${elapsedTimeMs}ms`);
    } else {
      console.log(formatted);
    }
  }
}

/**
 * Format SQL
 * @param sqlText The SQL to be formatted
 * @param options
 */
export function formatSql(sqlText: string, options: IOptions) {
  let command = buildCommand(options);
  // Pass sqlText in as stdin and run pgFormatter
  let formatted = execSync(command, {
    encoding: "utf8",
    input: sqlText
  });
  return formatted;
}

export { IOptions } from "./options";
