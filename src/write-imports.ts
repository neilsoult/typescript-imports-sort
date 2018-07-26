import { NamedImport, TypescriptImport } from './interfaces';
import * as options from './options';

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

const getPath = (importClause: TypescriptImport): string => {

    const quote = options.getQuoteToken();
    return `${quote}${importClause.path}${quote}`;

};

const generatedNamedImportGroup = (namedImports: NamedImport[]): string => {

    const generatedNamedImports = namedImports.map(generateNamedImport);
    const maxImportsPerSingleLine = options.getMaxNamedImportsPerSingleLine();
    if (generatedNamedImports.length > maxImportsPerSingleLine) {

        return `{${options.getNewLine()}${generatedNamedImports.join(`,${options.getNewLine()}`)}`
            + `${options.getNewLine(true)}}`;

    } else if (options.getBracketWhitespace()) {

        return `{ ${generatedNamedImports.join(', ')} }`;

    }

    return `{${generatedNamedImports.join(', ')}}`;

};

const generateNamedImport = (namedImport: NamedImport): string => {

    if (namedImport.alias) {

        return `${namedImport.importName} as ${namedImport.alias}`;

    }

    return namedImport.importName;

};

export const writeImports = (importClauses: TypescriptImport[]): string => {

    if (importClauses && importClauses.length) {

        return importClauses.map(getImportClauseString).join('\n') + '\n';

    }

};
