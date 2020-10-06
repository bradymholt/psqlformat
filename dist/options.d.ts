export interface IOptions {
    write?: boolean;
    spaces?: number;
    tabs?: boolean;
    maxLength?: number;
    commaStart?: boolean;
    commaBreak?: boolean;
    commaEnd?: boolean;
    noComment?: boolean;
    functionCase?: CaseOptionEnum;
    noGrouping?: boolean;
    keywordCase?: CaseOptionEnum;
    formatType?: boolean;
    wrapLimit?: number;
    placeholder?: string;
    extraFunction?: string;
    configFile?: string;
    perlBinPath?: string;
    pgFormatterPath?: string;
}
export declare enum CaseOptionEnum {
    unchanged = 0,
    lowercase = 1,
    uppercase = 2,
    capitalize = 3
}
