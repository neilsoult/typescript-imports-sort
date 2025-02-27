import * as vscode from 'vscode';
import { parseImportNodes } from './parse-import-nodes';
import { processImports, processImportsOverrides } from '../process-imports';
import { writeImports } from '../write-imports';

export const sortImports = (document: vscode.TextDocument) => {
    const imports = processImportsOverrides(processImports(parseImportNodes(document)));
    console.log('imports', imports);
    const sortedImportText = writeImports(imports);
    const edits: vscode.TextEdit[] = imports.map((importClause) => {
        return vscode.TextEdit.delete(importClause.range);
    });

    edits.push(vscode.TextEdit.insert(getImportsStartPosition(document), sortedImportText));

    return edits;
};

const getImportsStartPosition = (document: vscode.TextDocument) => {
    let importStartIndex = 0;
    for (let index = 0; index < document.lineCount; index++) {
        const line = document.lineAt(index);
        if (line.text.startsWith('import')) {
            importStartIndex = index;
            break;
        }
    }

    return new vscode.Position(importStartIndex, 0);
};
