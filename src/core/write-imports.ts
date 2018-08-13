import { NamedImport, TypescriptImport } from './interfaces';
import * as options from './options';

const generateDefaultImport = (namedImports: NamedImport[]) => {

    const singleLine = generateSingleLineImport(namedImports);
    if (options.getMaxLineLength() > 0 && singleLine.length > options.getMaxLineLength()) {

        return generateMulilineImport(namedImports);

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

const generatedNamedImportGroup = (namedImports: NamedImport[]): string => {

    if (namedImports.length > options.getMaxNamedImportsPerSingleLine()) {

        return generateMulilineImport(namedImports);

    }

    return generateDefaultImport(namedImports);

};

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

            return `import ${importClause.default}, ${generatedNamedImportGroup(importClause.namedImports)} `
                + `from ${path}${semicolon}`;

        }

        return `import ${importClause.default} from ${path}${semicolon}`;

    } else if (importClause.namedImports) {

        return `import ${generatedNamedImportGroup(importClause.namedImports)} from ${path}${semicolon}`;

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
