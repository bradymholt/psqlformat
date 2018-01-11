export interface IOptions {
  anonymize: boolean;
  commaStart: boolean;
  commaEnd: boolean;
  functionCase: string;
  maxLength: number;
  noComment: boolean;
  placeholder: string;
  spaces: number;
  separator: string;
  keywordCase: string;

  perlBinPath: string;
  write: string;
  fileOrGlob: string;
}

export enum CaseOptionEnum {
  unchanged = 0,
  lowercase = 1,
  uppercase = 2,
  capitalize = 3
}
