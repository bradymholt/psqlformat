export interface IOptions {
    anonymize?: boolean;
    commaStart?: boolean;
    commaEnd?: boolean;
    functionCase?: CaseOptionEnum;
    maxLength?: number;
    noComment?: boolean;
    placeholder?: string;
    spaces?: number;
    separator?: string;
    keywordCase?: CaseOptionEnum;
    perlBinPath?: string;
    write?: boolean;
    fileOrGlob?: string;
}
export declare enum CaseOptionEnum {
    unchanged = 0,
    lowercase = 1,
    uppercase = 2,
    capitalize = 3,
}
