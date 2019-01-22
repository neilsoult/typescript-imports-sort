import * as vscode from 'vscode';
import { options } from './core/options';
import { sortInsideEditor, sortOnSave } from './core/sort';
import { isSupportedLanguage } from './core/util';

let sortOnSaveDisposer: vscode.Disposable;

export const activate = (context: vscode.ExtensionContext) => {

    const sortOnCommandDisposer = vscode.commands.registerCommand('extension.typescriptImportsSort', () => {

        if (options.get('enableJavascript') && isFileJavascript() || isFileTypescript()) {

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

    const shouldSortOnSave = options.get('sortOnSave');
    if (shouldSortOnSave) {

        enableFileWatcher();

    } else {

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
