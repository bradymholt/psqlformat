export interface IOptions {
  write?: boolean;
  spaces?: number;
  maxLength?: number;
  commaStart?: boolean;
  commaBreak?: boolean;
  commaEnd?: boolean;
  noComment?: boolean;
  functionCase?: CaseOptionEnum;
  noGrouping?: boolean;
  keywordCase?: CaseOptionEnum;
  formatType?: boolean;
  placeholder?: string;

  perlBinPath?: string;
}

export enum CaseOptionEnum {
  unchanged = 0,
  lowercase = 1,
  uppercase = 2,
  capitalize = 3
}
