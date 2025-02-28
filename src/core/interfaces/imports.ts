import * as vscode from 'vscode';
import { PathSortOrderOption } from './options';

export interface NamedImport {
    alias?: string;
    hasTypeKeyword: boolean;
    importName: string;
}

export type DestructedImport = NamedImport;

export interface TypescriptImport {
    default?: string;
    hasTypeKeyword: boolean;
    markForDelete?: boolean;
    namedImports?: DestructedImport[];
    namespace?: string;
    path: string;
    range: vscode.Range;
}

export interface MappedImport {
    fileName?: string;
    idx: number;
    importClause: TypescriptImport;
    markForDelete?: boolean;
    pathSortCategory?: PathSortOrderOption;
}
