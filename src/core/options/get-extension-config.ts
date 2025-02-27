import * as vscode from 'vscode';

export const getExtensionConfig = (): vscode.WorkspaceConfiguration => {
    return vscode.workspace.getConfiguration('typescript.extension.sortImports');
};
