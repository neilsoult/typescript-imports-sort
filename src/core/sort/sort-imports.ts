import * as vscode from 'vscode';
import { parseImportNodes } from '../parse-import-nodes';
import { processImports } from '../process-imports';
import { writeImports } from '../write-imports';

export const sortImports = (document: vscode.TextDocument) => {

    let imports = parseImportNodes(document);
    imports = processImports(imports);
    const sortedImportText = writeImports(imports);
    const edits: vscode.TextEdit[] = imports.map((importClause) => {

        return vscode.TextEdit.delete(importClause.range);

    });
    edits.push(vscode.TextEdit.insert(new vscode.Position(0, 0), sortedImportText));

    return edits;

};
