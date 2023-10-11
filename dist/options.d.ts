export interface IOptions {
    write?: boolean;
    chunkSize?: number;
    perlBinPath?: string;
    pgFormatterPath?: string;
    /**
     * Use the specified configuration file
     */
    configFile?: string;
    /**
     * In a parameters list, start with the comma
     */
    commaStart?: boolean;
    /**
     * In a parameters list, end with the comma
     */
    commaEnd?: boolean;
    /**
     * In insert statement, add a newline after each comma
     */
    commaBreak?: boolean;
    /**
     * Change the case of function names
     */
    functionCase?: CaseOptionEnum;
    /**
     * Change the case of reserved keywords
     */
    keywordCase?: CaseOptionEnum;
    /**
     * Change the case of data type names
     */
    typeCase?: CaseOptionEnum;
    /**
     * Add a newline between statements in transaction regroupement (default is to group statements)
     */
    noGrouping?: boolean;
    /**
     * Do not add an extra empty line at end of the output
     */
    noExtraLine?: boolean;
    /**
     * Maximum length of a query; the line will be cut before or at the given length
     */
    maxLength?: number;
    /**
     * Remove any comments
     */
    noComment?: boolean;
    /**
     * Use spacees for indentation (default 4 spaces)
     */
    spaces?: number;
    /**
     * Use tabs instead of spaces
     */
    tabs?: boolean;
    /**
     * Wrap queries at a certain length
     */
    wrapLimit?: number;
    /**
     * With wrapLimit specified, apply reformatting to comments
     */
    wrapComment?: boolean;
    /**
     * Use an alternate formatting algorithm which works better for some statements
     */
    formatType?: boolean;
    /**
     * Set regex to find code that must not be changed
     */
    placeholder?: string;
    /**
     * File containing a list of functions to use the same formatting as PostgreSQL internal function
     */
    extraFunction?: string;
    /**
     * Remove space between function call and the open parenthesis
     */
    noSpaceFunction?: boolean;
}
export declare enum CaseOptionEnum {
    unchanged = 0,
    lowercase = 1,
    uppercase = 2,
    capitalize = 3
}
