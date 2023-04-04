import { IOptions } from "./options";
/**
 *
 * @param fileOrGlob The file path or glob to use (i.e. /tmp/query.sql or *.sql)
 * @param options
 */
export declare function formatFiles(filesOrGlobs: string | string[], editInPlace: boolean, options?: IOptions, log?: (text: string) => void): string;
/**
 * Format SQL
 * @param sqlText The SQL to be formatted
 * @param options
 */
export declare function formatSql(sqlText: string, options?: IOptions): string;
export { IOptions, CaseOptionEnum } from "./options";
export declare function buildCommand(options: IOptions): string;
export declare function buildCommandArguments(options: IOptions): string;
