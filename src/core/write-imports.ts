import { NamedImport, TypescriptImport } from './interfaces';
import * as options from './options';

const generateNamedImport = (namedImport: NamedImport): string => {

    if (namedImport.alias) {

        return `${namedImport.importName} as ${namedImport.alias}`;

    }

    return namedImport.importName;

};

const generatedNamedImportGroup = (namedImports: NamedImport[]): string => {

    const trailingComma = options.getTrailingCommaOption();
    const trailingCommaOnMultiLine = ['always', 'multiLineOnly'].includes(trailingComma);
    const trailingCommaOnSingleLine = ['always', 'singleLineOnly'].includes(trailingComma);
    if (namedImports.length > options.getMaxNamedImportsPerSingleLine()) {

        return `{${options.getNewLine()}`
            + getJoinedNamedImportList(namedImports, true, trailingCommaOnMultiLine)
            + `${options.getNewLine(true)}}`;

    } else if (options.getBracketWhitespace()) {

        return `{ ${getJoinedNamedImportList(namedImports, false, trailingCommaOnSingleLine)} }`;

    }

    return `{${getJoinedNamedImportList(namedImports, false, trailingCommaOnSingleLine)}}`;

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
