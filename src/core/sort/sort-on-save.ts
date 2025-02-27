import * as vscode from 'vscode';
import { sortImports } from './sort-imports';
import { isSupportedLanguage } from '../util/index';

export const sortOnSave = (event: vscode.TextDocumentWillSaveEvent) => {
    if (isSupportedLanguage(event.document.languageId)) {
        event.waitUntil(
            new Promise<vscode.TextEdit[]>((resolve) => {
                resolve(sortImports(event.document));
            })
        );
    }
};
