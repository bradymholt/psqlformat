import { IOptions } from "./options";
/**
 *
 * @param fileOrGlob The file path or glob to use (i.e. /tmp/query.sql or *.sql)
 * @param options
 */
export default function formatFiles(fileOrGlob: string, options: IOptions): void;
/**
 * Format SQL
 * @param sqlText The SQL to be formatted
 * @param options
 */
export declare function formatSql(sqlText: string, options: IOptions): string;
export { IOptions } from "./options";
