import * as vscode from 'vscode';
import { sortImports } from './sort-imports';

export const sortInsideEditor = () => {

    const editor = vscode.window.activeTextEditor;
    const edits: vscode.TextEdit[] = sortImports(editor.document);

    editor.edit((editBuilder) => {

        edits.forEach((edit) => {

            editBuilder.replace(edit.range, edit.newText);

        });

    });

};
