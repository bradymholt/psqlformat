import * as path from "path";
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
  // both the editInPlace and options.write properties mean the same thing, ensure they're aligned here
  editInPlace = editInPlace ?? options.write ?? false;
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
    const output = execSync(command, {
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
    input: sqlText,
  });
  return formatted;
}

export { IOptions, CaseOptionEnum } from "./options";

export function buildCommand(options: IOptions) {
  let pgFormatterPath = options.pgFormatterPath || path.resolve(__dirname, "../vendor/pgFormatter/pg_format");
  let commandArgs = buildCommandArguments(options);

  return `${options.perlBinPath || "perl"} ${pgFormatterPath} ${commandArgs}`;
}

export function buildCommandArguments(options: IOptions) {
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

  if (options.typeCase != null) {
    commandArgs += ` --type-case ${options.typeCase}`;
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

  return commandArgs;
}
