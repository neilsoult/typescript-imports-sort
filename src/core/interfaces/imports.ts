import * as vscode from 'vscode';
import { PathSortOrderOption } from './options';

export interface NamedImport {
    importName: string;
    alias?: string;
}

export type DestructedImport = NamedImport;

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
