export interface IOptions {
    spaces?: number;
    maxLength?: number;
    commaStart?: boolean;
    commaEnd?: boolean;
    noComment?: boolean;
    functionCase?: CaseOptionEnum;
    keywordCase?: CaseOptionEnum;
    perlBinPath?: string;
}
export declare enum CaseOptionEnum {
    unchanged = 0,
    lowercase = 1,
    uppercase = 2,
    capitalize = 3,
}
