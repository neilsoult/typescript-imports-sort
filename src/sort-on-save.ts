import * as vscode from 'vscode';
import { isSupportedLanguage } from './is-supported-language';
import { sortImports } from './sort-imports';

export const sortOnSave = (event: vscode.TextDocumentWillSaveEvent) => {

    if (isSupportedLanguage(event.document.languageId)) {

        event.waitUntil(new Promise<vscode.TextEdit[]>((resolve) => {

            resolve(sortImports(event.document));

        }));

    }

};
