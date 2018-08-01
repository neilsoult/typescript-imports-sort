import * as vscode from 'vscode';
import {
    isSupportedLanguage,
    shouldEnableJavascript,
    shouldSortOnSave,
    sortInsideEditor,
    sortOnSave
} from './core';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below

let sortOnSaveDisposer: vscode.Disposable;

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export const activate = (context: vscode.ExtensionContext) => {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    const sortOnCommandDisposer = vscode.commands.registerCommand('extension.typescriptImportsSort', () => {
        // The code you place here will be executed every time your command is executed

        if (shouldEnableJavascript() && isFileJavascript() || isFileTypescript()) {

            sortInsideEditor();

        }

    });

    const configurationWatcher = vscode.workspace.onDidChangeConfiguration(configure);
    configure();

    context.subscriptions.push(sortOnCommandDisposer, configurationWatcher);

};

const isFileJavascript = () => {

    return ['javascript', 'javascriptreact'].includes(vscode.window.activeTextEditor.document.languageId);

};

const isFileTypescript = () => {

    return isSupportedLanguage(vscode.window.activeTextEditor.document.languageId);

};

const configure = () => {

    if (shouldSortOnSave()) {

        enableFileWatcher();

    } else if (!shouldSortOnSave()) {

        disableFileWatcher();

    }

};

const enableFileWatcher = () => {

    if (!sortOnSaveDisposer) {

        sortOnSaveDisposer = vscode.workspace.onWillSaveTextDocument(sortOnSave);

    }

};

const disableFileWatcher = () => {

    if (sortOnSaveDisposer) {

        sortOnSaveDisposer.dispose();
        sortOnSaveDisposer = undefined;

    }

};

// this method is called when your extension is deactivated
export const deactivate =  () => {

    disableFileWatcher();

};
