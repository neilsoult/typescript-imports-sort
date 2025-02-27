import { sortFactory } from './sort-factory';
import { MappedImport, PathSortOrderOption } from '../interfaces';
import { options } from '../options/index';

export const pathSort = (mappedImports: MappedImport[]): MappedImport[] => {
    // console.log('pathSort');
    return options.get('pathSortOrder').reduce((imports: MappedImport[], sortOption: PathSortOrderOption) => {
        return [
            ...imports,
            ...mappedImports
                .filter((imp) => {
                    return imp.pathSortCategory === sortOption;
                })
                .sort(sortFactory()),
        ];
    }, []);
};
