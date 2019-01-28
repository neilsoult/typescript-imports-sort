import { NamedImport, TypescriptImport } from './interfaces';
import { options } from './options/index';
import { getNewLine, getQuoteToken } from './util/index';

const generateDefaultImportString = (namedImports: NamedImport[], pre: string, post: string) => {

    const maxLineLength = options.get('maxLineLength');
    const singleLine = `${pre}${generateSingleLineImport(namedImports)}${post}`;
    // console.log('single line:', singleLine);
    // console.log('single line length', singleLine.length);
    // console.log('options', options.getMaxLineLength());
    if (maxLineLength > 0 && singleLine.length > maxLineLength) {

        return `${pre}${generateMulilineImport(namedImports)}${post}`;

    }

    return singleLine;

};

const generateMulilineImport = (namedImports: NamedImport[]) => {

    const trailingCommaOnMultiLine = ['always', 'multiLineOnly'].includes(options.get('forceTrailingCommas'));

    return `{${getNewLine()}`
        + getJoinedNamedImportList(namedImports, true, trailingCommaOnMultiLine)
        + `${getNewLine(true)}}`;

};

const generateNamedImport = (namedImport: NamedImport): string => {

    if (namedImport.alias) {

        return `${namedImport.importName} as ${namedImport.alias}`;

    }

    return namedImport.importName;

};

const generateNamedImportString = (namedImports: NamedImport[], pre: string, post: string) => {

    const maxImports = options.get('maxNamedImportsInSingleLine');
    if (namedImports.length > maxImports && maxImports > 0) {

        return `${pre}${generateMulilineImport(namedImports)}${post}`;

    }

    return generateDefaultImportString(namedImports, pre, post);

};

// const generatedNamedImportGroup = (namedImports: NamedImport[]): string => {

//     if (namedImports.length > options.getMaxNamedImportsPerSingleLine()) {

//         return generateMulilineImport(namedImports);

//     }

//     return generateDefaultImport(namedImports);

// };

const generateSingleLineImport = (namedImports: NamedImport[]) => {

    const trailingCommaOnSingleLine = ['always', 'singleLineOnly'].includes(options.get('forceTrailingCommas'));
    let pre = '{', post = '}';

    if (options.get('bracketWhitespace')) {

        pre = '{ ';
        post = ' }';

    }

    return `${pre}${getJoinedNamedImportList(namedImports, false, trailingCommaOnSingleLine)}${post}`;

};

const getImportClauseString = (importClause: TypescriptImport): string => {

    const path = getPath(importClause);
    let semicolon = '';
    if (!options.get('omitSemicolon')) {

        semicolon = ';';

    }
    if (importClause.namespace) {

        return `import * as ${importClause.namespace} from ${path}${semicolon}`;

    } else if (importClause.default) {

        if (importClause.namedImports) {

            return generateNamedImportString(
                importClause.namedImports, `import ${importClause.default}, `, ` from ${path}${semicolon}`
            );

        }

        return `import ${importClause.default} from ${path}${semicolon}`;

    } else if (importClause.namedImports) {

        return generateNamedImportString(importClause.namedImports, `import `, ` from ${path}${semicolon}`);

    }

    return `import ${path}${semicolon}`;

};

const getJoinedNamedImportList = (namedImports: NamedImport[], isMultline: boolean, addTrailingComma: boolean) => {

    const generatedNamedImports = namedImports.map(generateNamedImport);
    const joiner = isMultline ? `,${getNewLine()}` : ', ';
    return generatedNamedImports.join(joiner) + (addTrailingComma ? ',' : '');

};

const getPath = (importClause: TypescriptImport): string => {

    const quote = getQuoteToken();
    return `${quote}${importClause.path}${quote}`;

};

export const writeImports = (importClauses: TypescriptImport[]): string => {

    if (importClauses && importClauses.length) {

        return importClauses.map(getImportClauseString).join('\n') + '\n';

    }

};
