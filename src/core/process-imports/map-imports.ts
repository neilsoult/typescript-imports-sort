import { sortNamedImports } from './sort-factory';
import { MappedImport, PathSortOrderOption, TypescriptImport } from '../interfaces';

const getFileName = (path: string) => {

    const splitPath = path.split('/');
    return splitPath[splitPath.length - 1];

};

const getPathSortOrdering = (path: string): PathSortOrderOption => {

    if (/^\.\//.test(path)) {

        return 'relativeDownLevel';

    } else if (/^\.\.\//.test(path)) {

        return 'relativeUpLevel';

    }

    return 'package';

};

export const mapImports = (importClause: TypescriptImport, idx: number): MappedImport => {

    if (importClause.namedImports) {

        importClause.namedImports.sort(sortNamedImports);

    }
    const mImport: MappedImport = { idx, importClause };

    if (importClause.path) {

        mImport.fileName = getFileName(importClause.path);
        mImport.pathSortCategory = getPathSortOrdering(importClause.path);

    }

    return mImport;

};

export const unmapImports = ({ importClause }: MappedImport): TypescriptImport => {

    return importClause;

};
