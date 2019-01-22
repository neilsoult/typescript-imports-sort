import { MappedImport, NamedImport } from '../interfaces';
import { options } from '../options';
import { compareCaseInsensitive } from '../util';

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
    // fall through means paths are the same - combined named imports
    if (a.importClause.namedImports && b.importClause.namedImports) {

        const uniqueNamedImports = b.importClause.namedImports.filter((namedImport) => {

            return a.importClause.namedImports.includes(namedImport);

        });
        a.importClause.namedImports = [...a.importClause.namedImports, ...uniqueNamedImports].sort(sortNamedImports);

    }
    b.markForDelete = true;
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
