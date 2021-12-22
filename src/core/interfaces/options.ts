export type ForceTrailingCommasOption = 'never' | 'always' | 'singleLineOnly' | 'multiLineOnly';
export type MultilineIndentionOption = 'none' | 'namesOnly' | 'namesAndPath';
export type PathSortOrderOption = 'package' | 'relativeUpLevel' | 'relativeDownLevel';
export type SortMethodOption = 'importName' | 'fileName' | 'path';

export interface ExtensionOptions {
    bracketWhitespace: boolean;
    enableJavascript: boolean;
    forceTrailingCommas: ForceTrailingCommasOption;
    maxLineLength: number;
    maxNamedImportsInSingleLine: number;
    multilineIndention: MultilineIndentionOption;
    omitSemicolon: boolean;
    pathSortOrder: PathSortOrderOption[];
    pathSortOrderOverride: string[];
    quoteStyle: 'double' | 'single';
    sortMethod: SortMethodOption;
    sortOnSave: boolean;
}

export type ExtensionOptionsKey = keyof ExtensionOptions;
