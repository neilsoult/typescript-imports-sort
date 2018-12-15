import * as vscode from 'vscode';

export type DestructedImport = NamedImport;

export interface NamedImport {
    importName: string;
    alias?: string;
}

export interface TypescriptImport {
    path: string;
    range: vscode.Range;
    default?: string;
    namedImports?: DestructedImport[];
    namespace?: string;
}

export interface MappedImport {
    fileName?: string;
    idx: number;
    importClause: TypescriptImport;
    markForDelete?: boolean;
    pathSortCategory?: PathSortOrderOption;
}

export type ForceTrailingCommasOption = 'never' | 'always' | 'singleLineOnly' | 'multiLineOnly';
export type MultilineIndentionOption = 'none' | 'namesOnly' | 'namesAndPath';
export type PathSortOrderOption = 'package' | 'relativeUpLevel' | 'relativeDownLevel';
export type SortMethodOption = 'importName' | 'fileName' | 'path';
