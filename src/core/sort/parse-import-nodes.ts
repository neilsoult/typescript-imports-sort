import * as vscode from 'vscode';
import { DestructedImport, TypescriptImport } from '../interfaces';

const name = `((?!\\d)(?:(?!\\s)[$\\w\\u0080-\\uFFFF]|\\\\u[\\da-fA-F]{4}|\\\\u\\{[\\da-fA-F]+\\})+)`;
const ws = `\\s`;
const spaceNoReturns = `[^\\S\\r\\n]`;

const namespaceToken = `\\*\\s+as\\s+(${name})`;
const defaultImportToken = name;
const destructingImportToken = `(${name})(\\s+as\\s+(${name}))?`;
const destructingImport = `{(${ws}*${destructingImportToken}(${ws}*,${ws}*${destructingImportToken})*${ws}*,?${ws}*)}`;
const defaultAndDestructingImport = `${defaultImportToken}${ws}*,${ws}*${destructingImport}`;
const combinedImportTypes = `(${namespaceToken}|${defaultImportToken}|${destructingImport}|${defaultAndDestructingImport})`;
const inlineComment = `(${spaceNoReturns}*[\\/]{2}.*)?`;
const importRegexString = `^import(\\s+type)?\\s+(${combinedImportTypes}\\s+from\\s+)?['"]([~@\\w\\\\/\.-]+)['"];?${inlineComment}\\r?\\n?`;

// Group 1 - type keyword
// Group 2 - importName
// Group 4 - namespace import
// Group 5 - alias
// Group 6 || Group 19 - default import
// Group 7 || Group 20 - destructing import group; requires further tokenizing
// Group 32 - file path or package
// Group 33 - inline comment

const importRegex = new RegExp(importRegexString, 'gm');
// console.log('regex', importRegexString);
const destructingImportTokenRegex = new RegExp(destructingImportToken);

const parseDestructiveImports = (destructiveImports: string): DestructedImport[] => {
    if (!destructiveImports) {
        return null;
    }

    return destructiveImports
        .split(',')
        .map((destructiveImport) => {
            const match = destructingImportTokenRegex.exec(destructiveImport);
            return !match ? null : { alias: match[4], importName: match[1] };
        })
        .filter((destructiveImport) => !!destructiveImport?.importName);
};

export const parseImportNodes = (document: vscode.TextDocument) => {
    const source = document.getText();
    importRegex.lastIndex = 0;
    const imports: TypescriptImport[] = [];

    if (/(disable-sort-imports)/g.test(source)) {
        return [];
    }

    let match;
    while ((match = importRegex.exec(source))) {
        // console.log('import regex match', match);
        imports.push({
            default: match[6] || match[19],
            hasTypeKeyword: !!match[1],
            namedImports: parseDestructiveImports(match[7] || match[20]),
            namespace: match[4],
            path: match[32],
            range: new vscode.Range(document.positionAt(match.index), document.positionAt(importRegex.lastIndex)),
        });
    }

    return imports;
};
