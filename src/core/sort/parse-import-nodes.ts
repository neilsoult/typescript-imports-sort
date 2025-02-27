import * as vscode from 'vscode';
import { DestructedImport, TypescriptImport } from '../interfaces';

const name = `((?!\\d)(?:(?!\\s)[$\\w\\u0080-\\uFFFF]|\\\\u[\\da-fA-F]{4}|\\\\u\\{[\\da-fA-F]+\\})+)`;
const ws = `\\s`;
const spaceNoReturns = `[^\\S\\r\\n]`;

const namespaceToken = `\\*\\s+as\\s+(${name})`;
const defaultImportToken = name;
const destructingImportToken = `((type\\s+)?${name})(\\s+as\\s+(${name}))?`;
const destructingImport = `{(${ws}*${destructingImportToken}(${ws}*,${ws}*${destructingImportToken})*${ws}*,?${ws}*)}`;
const defaultAndDestructingImport = `${defaultImportToken}${ws}*,${ws}*${destructingImport}`;
const combinedImportTypes = `(${namespaceToken}|${defaultImportToken}|${destructingImport}|${defaultAndDestructingImport})`;
const inlineComment = `(${spaceNoReturns}*[\\/]{2}.*)?`;
const importRegexString = `^import(\\s+type)?\\s+(${combinedImportTypes}\\s+from\\s+)?['"]([~@\\w\\\\/\.-]+)['"];?${inlineComment}\\r?\\n?`;

// importRegexString groups:
// Group 1 - type keyword
// Group 2 - importName
// Group 4 - namespace import
// Group 5 - alias
// Group 6 || Group 21 - default import
// Group 7 || Group 22 - destructing import group; requires further tokenizing
// Group 36 - file path or package
// Group 37 - inline comment

const importRegex = new RegExp(importRegexString, 'gm');
console.log('import regex', importRegexString);
const destructingImportTokenRegex = new RegExp(destructingImportToken);
// console.log('destructuring regex', destructingImportTokenRegex);

// destructingImportTokenRegex groups:
// Group 1 - full import name
// Group 2 - type keyword
// Group 4 - full alias part including 'as' keyword
// Group 5 - alias name

const parseDestructiveImports = (destructiveImports: string): DestructedImport[] => {
    if (!destructiveImports) {
        return null;
    }

    return destructiveImports
        .split(',')
        .map((destructiveImport) => {
            const match = destructingImportTokenRegex.exec(destructiveImport);
            console.log('destructive imports', match);
            return !match ? null : { alias: match[5], hasTypeKeyword: !!match[2], importName: match[1] };
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
        console.log('import regex match', JSON.stringify(match), match.length);
        imports.push({
            default: match[6] || match[21],
            hasTypeKeyword: !!match[1],
            namedImports: parseDestructiveImports(match[7] || match[22]),
            namespace: match[4],
            path: match[36],
            range: new vscode.Range(document.positionAt(match.index), document.positionAt(importRegex.lastIndex)),
        });
    }
    console.log('parseImportNodes', imports);
    return imports;
};
