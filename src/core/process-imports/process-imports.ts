import { importNameSort } from './import-name-sort';
import { mapImports, unmapImports } from './map-imports';
import { pathSort } from './path-sort';
import { TypescriptImport } from '../interfaces';
import { options } from '../options';

export const processImports = (importClauses: TypescriptImport[]): TypescriptImport[] => {

    // map imports for easier sorting
    const mappedImports = importClauses.map(mapImports);
    // console.log('mapped imports', mappedImports);
    // sort
    if (options.get('sortMethod') === 'importName') {

        // console.log('importName is sort option');
        return importNameSort(mappedImports)
        .filter(({ markForDelete }) => !markForDelete)
        .map(unmapImports);

    }
    // sortOptions 'path' and 'fileName' use the same sort ordering
    // console.log('sort option is not importName');
    return pathSort(mappedImports)
    .filter(({ markForDelete }) => !markForDelete)
    .map(unmapImports);

};
