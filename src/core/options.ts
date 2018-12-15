import * as vscode from 'vscode';
import {
    ForceTrailingCommasOption,
    MultilineIndentionOption,
    PathSortOrderOption,
    SortMethodOption
} from './interfaces';

const getExtensionConfig = (): vscode.WorkspaceConfiguration => {

    return vscode.workspace.getConfiguration('typescript.extension.sortImports');

};

export const getBracketWhitespace = (): boolean => {

    return getExtensionConfig().get('bracketWhitespace');

};

export const getMaxLineLength = (): number => {

    return getExtensionConfig().get('maxLineLength');

};

export const getMaxNamedImportsPerSingleLine = (): number => {

    return getExtensionConfig().get('maxNamedImportsInSingleLine');

};

const getMultilineIndention = (): MultilineIndentionOption => {

    return getExtensionConfig().get('multilineIndention');

};

export const getNewLine = (
    isEnd: boolean = false, editor: vscode.TextEditor = vscode.window.activeTextEditor
): string => {

    const multilineIndention = getMultilineIndention();
    if (multilineIndention === 'none' || (multilineIndention === 'namesOnly' && isEnd)) {

        return '\n';

    }
    if (editor.options.insertSpaces) {

        return `\n${new Array(editor.options.tabSize as number + 1).join(' ')}`;

    } else {

        return '\n\t';

    }

};

export const getOmitSemicolon = (): boolean => {

    return getExtensionConfig().get('omitSemicolon');

};

export const getPathSortOrdering = (): PathSortOrderOption[] => {

    return getExtensionConfig().get('pathSortOrder');

};

export const getQuoteToken = (): `"` | `'` => {

    switch (getExtensionConfig().get('quoteStyle')) {

        case 'double':
            return `"`;
        case 'single':
        default:
            return `'`;

    }

};

export const getSortOption = (): SortMethodOption => {

    return getExtensionConfig().get('sortMethod');

};

export const getTrailingCommaOption = (): ForceTrailingCommasOption => {

    return getExtensionConfig().get('forceTrailingCommas');

};

export const shouldEnableJavascript = (): boolean => {

    return getExtensionConfig().get('enableJavascript');

};

export const shouldSortOnSave = (): boolean => {

    return getExtensionConfig().get('sortOnSave');

};
