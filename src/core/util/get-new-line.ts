import * as vscode from 'vscode';
import { options } from '../options';

export const getNewLine = (
    isEnd: boolean = false, editor: vscode.TextEditor = vscode.window.activeTextEditor
): string => {

    const multilineIndention = options.get('multilineIndention');
    if (multilineIndention === 'none' || (multilineIndention === 'namesOnly' && isEnd)) {

        return '\n';

    }
    if (editor.options.insertSpaces) {

        return `\n${new Array(editor.options.tabSize as number + 1).join(' ')}`;

    } else {

        return '\n\t';

    }

};
