import { sortFactory } from './sort-factory';
import { MappedImport, PathSortOrderOption } from '../interfaces';
import * as options from '../options';

export const pathSort = (mappedImports: MappedImport[]): MappedImport[] => {

    console.log('pathSort');
    return options.getPathSortOrdering()
    .reduce((imports: MappedImport[], sortOption: PathSortOrderOption) => {

        return [
            ...imports,
            ...mappedImports.filter((imp) => {

                return imp.pathSortCategory === sortOption;

            })
            .sort(sortFactory())
        ];

    }, []);

};
