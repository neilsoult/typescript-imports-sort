import * as vscode from 'vscode';

const getExtensionConfig = () => {

    return vscode.workspace.getConfiguration('typescript.extension.sortImports');

};

export const getBracketWhitespace = (): boolean => {

    return getExtensionConfig().get('bracketWhitespace') as boolean;

};

export const getMaxLineLength = (): number => {

    return getExtensionConfig().get('maxLineLength');

};

export const getMaxNamedImportsPerSingleLine = (): number => {

    return getExtensionConfig().get('maxNamedImportsInSingleLine');

};

const getMultilineIndention = (): string => {

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

    return getExtensionConfig().get('omitSemicolon') as boolean;

};

export const getPathSortOrdering = (): string[] => {

    return getExtensionConfig().get('pathSortOrder') as string[];

};

export const getQuoteToken = (): string => {

    switch (getExtensionConfig().get('quoteStyle')) {

        case 'double':
            return '"';
        case 'single':
        default:
            return '\'';

    }

};

export const getSortOption = (): string => {

    return getExtensionConfig().get('sortMethod');

};

export const getTrailingCommaOption = (): string => {

    return getExtensionConfig().get('forceTrailingCommas');

};

export const shouldEnableJavascript = (): boolean => {

    return getExtensionConfig().get('enableJavascript') as boolean;

};

export const shouldSortOnSave = (): boolean => {

    return getExtensionConfig().get('sortOnSave') as boolean;

};
