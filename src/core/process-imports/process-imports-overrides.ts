import { TypescriptImport } from '../interfaces';
import { options } from '../options/index';

const pathMatchInOverrides = (path: string) => {
    return options.get('pathSortOrderOverride').includes(path);
};

export const processImportsOverrides = (importClauses: TypescriptImport[]): TypescriptImport[] => {
    if (options.get('pathSortOrderOverride') && options.get('pathSortOrderOverride').length > 0) {
        if (importClauses.some(({ path }) => pathMatchInOverrides(path))) {
            const originalImports = importClauses.filter(({ path }) => !pathMatchInOverrides(path));
            const priorityImports = importClauses.filter(({ path }) => pathMatchInOverrides(path));

            importClauses = [...priorityImports, ...originalImports];
        }
    }

    return importClauses;
};
