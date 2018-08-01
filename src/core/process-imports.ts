import { TypescriptImport } from './interfaces';
import * as options from './options';

const compareImportClauses = (a: TypescriptImport, b: TypescriptImport) => {

    if (options.getSortOption() === 'path') {

        return comparePath(a, b) || compareCaseInsensitive(a.path, b.path);

    } else {

        return compareImportType(a, b) || (a.namespace && compareCaseInsensitive(a.namespace, b.namespace))
            || (a.default && compareCaseInsensitive(a.default, b.default)) || comparePath(a, b)
            || (a.namedImports && compareCaseInsensitive(a.namedImports[0].importName, b.namedImports[0].importName));

    }

};

const compareCaseInsensitive = (a: string, b: string) => {

    return a.localeCompare(b, 'en', { sensitivity: 'base' });

};

const comparePath = (a: TypescriptImport, b: TypescriptImport) => {

    return getPathPriority(a.path) - getPathPriority(b.path);

};

const getPathPriority = (path: string) => {

    const sortOrder = options.getPathSortOrdering();
    if (/^\.\//.test(path)) {

        return sortOrder.indexOf('relativeDownLevel');

    } else if (/^\.\.\//.test(path)) {

        return sortOrder.indexOf('relativeUpLevel');

    }

    return sortOrder.indexOf('package');

};

const compareImportType = (a: TypescriptImport, b: TypescriptImport) => {

    return getImportTypePriority(a) - getImportTypePriority(b);

};

const getImportTypePriority = (importClause: TypescriptImport) => {

    if (importClause.namespace) {

        return 0;

    } else if (importClause.default) {

        return 1;

    } else if (importClause.namedImports) {

        return 2;

    } else {

        return 3;

    }

};

export const processImports = (importClauses: TypescriptImport[]): TypescriptImport[] => {

    return importClauses.map(importClause => {

        if (importClause.namedImports) {

            importClause.namedImports.sort((a, b) => {

                return a.importName.localeCompare(b.importName, 'en', { sensitivity: 'base' });

            });

        }

        return importClause;

    })
    .sort(compareImportClauses);

};
