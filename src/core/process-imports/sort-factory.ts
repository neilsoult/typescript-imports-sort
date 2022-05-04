import { MappedImport, NamedImport } from '../interfaces';
import { options } from '../options/index';
import { importPathsMatch } from '../util/import-paths-match';
import { compareCaseInsensitive } from '../util/index';

const checkMarkedForDelete = ({ markForDelete: a }: MappedImport, { markForDelete: b }: MappedImport): number => {

    if (b) {

        return -1;

    } else if (a) {

        return 1;

    }
    return 0;

};

const sortByFileName = (a: MappedImport, b: MappedImport): number => {

    // console.log('fileNameSort');
    const fileNameCompareResult = compareCaseInsensitive(a.fileName, b.fileName);
    if (fileNameCompareResult) {

        return fileNameCompareResult;

    }
    // fall through means the file names are the same, so use sortByPath
    return sortByPath(a, b);

};

export const sortByPath = (a: MappedImport, b: MappedImport): number => {

    // console.log('sortByPath');
    const markedForDelete = checkMarkedForDelete(a, b);
    if (markedForDelete) {

        return markedForDelete;

    }
    const pathCompareResult = compareCaseInsensitive(a.importClause.path, b.importClause.path);
    if (pathCompareResult) {

        return pathCompareResult;

    }
    if (importPathsMatch(a, b)) {

        if (a.importClause.hasTypeKeyword || b.importClause.hasTypeKeyword) {

            return 1;

        }
        if (a.importClause.namedImports && b.importClause.namedImports) {

            // console.log('get unique named imports');
            // console.log(b.importClause.namedImports);
            // console.log(a.importClause.namedImports);
            const uniqueNamedImports = b.importClause.namedImports.filter(({ importName }) => {

                return !a.importClause.namedImports.some(({ importName: name }) => importName === name);

            });
            // console.log({ uniqueNamedImports });
            a.importClause.namedImports = [...a.importClause.namedImports, ...uniqueNamedImports]
            .sort(sortNamedImports);
            b.markForDelete = true;
            return 1;

        }

    }
    return -1;

};

export const sortFactory = (): (a: MappedImport, b: MappedImport) => number => {

    switch (options.get('sortMethod')) {

        case 'fileName':
            return sortByFileName;
        case 'path':
            return sortByPath;

    }

};

export const sortNamedImports = ({ importName: a }: NamedImport, { importName: b }: NamedImport): number => {

    return compareCaseInsensitive(a, b);

};
