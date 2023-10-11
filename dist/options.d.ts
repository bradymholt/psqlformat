export interface IOptions {
    write?: boolean;
    chunkSize?: number;
    perlBinPath?: string;
    pgFormatterPath?: string;
    commaStart?: boolean;
    commaBreak?: boolean;
    wrapComment?: boolean;
    commaEnd?: boolean;
    configFile?: string;
    functionCase?: CaseOptionEnum;
    noGrouping?: boolean;
    noExtraLine?: boolean;
    maxLength?: number;
    noComment?: boolean;
    placeholder?: string;
    spaces?: number;
    formatType?: boolean;
    tabs?: boolean;
    keywordCase?: CaseOptionEnum;
    typeCase?: CaseOptionEnum;
    wrapLimit?: number;
    extraFunction?: string;
    noSpaceFunction?: boolean;
}
export declare enum CaseOptionEnum {
    unchanged = 0,
    lowercase = 1,
    uppercase = 2,
    capitalize = 3
}
