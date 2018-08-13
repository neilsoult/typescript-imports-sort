import { NamedImport, TypescriptImport } from './interfaces';
import * as options from './options';

const generateDefaultImportString = (namedImports: NamedImport[], pre: string, post: string) => {

    const singleLine = `${pre}${generateSingleLineImport(namedImports)}${post}`;
    console.log('single line:', singleLine);
    console.log('single line length', singleLine.length);
    console.log('options', options.getMaxLineLength());
    if (options.getMaxLineLength() > 0 && singleLine.length > options.getMaxLineLength()) {

        return `${pre}${generateMulilineImport(namedImports)}${post}`;

    }

    return singleLine;

};

const generateMulilineImport = (namedImports: NamedImport[]) => {

    const trailingCommaOnMultiLine = ['always', 'multiLineOnly'].includes(options.getTrailingCommaOption());

    return `{${options.getNewLine()}`
        + getJoinedNamedImportList(namedImports, true, trailingCommaOnMultiLine)
        + `${options.getNewLine(true)}}`;

};

const generateNamedImport = (namedImport: NamedImport): string => {

    if (namedImport.alias) {

        return `${namedImport.importName} as ${namedImport.alias}`;

    }

    return namedImport.importName;

};

const generateNamedImportString = (namedImports: NamedImport[], pre: string, post: string) => {

    if (namedImports.length > options.getMaxNamedImportsPerSingleLine()) {

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

    const trailingCommaOnSingleLine = ['always', 'singleLineOnly'].includes(options.getTrailingCommaOption());
    let pre = '{', post = '}';

    if (options.getBracketWhitespace()) {

        pre = '{ ';
        post = ' }';

    }

    return `${pre}${getJoinedNamedImportList(namedImports, false, trailingCommaOnSingleLine)}${post}`;

};

const getImportClauseString = (importClause: TypescriptImport): string => {

    const path = getPath(importClause);
    let semicolon = '';
    if (!options.getOmitSemicolon()) {

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
    const joiner = isMultline ? `,${options.getNewLine()}` : ', ';
    return generatedNamedImports.join(joiner) + (addTrailingComma ? ',' : '');

};

const getPath = (importClause: TypescriptImport): string => {

    const quote = options.getQuoteToken();
    return `${quote}${importClause.path}${quote}`;

};

export const writeImports = (importClauses: TypescriptImport[]): string => {

    if (importClauses && importClauses.length) {

        return importClauses.map(getImportClauseString).join('\n') + '\n';

    }

};
