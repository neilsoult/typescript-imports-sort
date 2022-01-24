import { TypescriptImport } from '../interfaces';
import { options } from '../options/index';

export const processImportsOverrides = (importClauses: TypescriptImport[]): TypescriptImport[] => {

    if (options.get('pathSortOrderOverride') && options.get('pathSortOrderOverride').length > 0) {

        options.get('pathSortOrderOverride').reverse().forEach((override) => {

            if (importClauses.some(({ path }) => path === override)) {

                const originalImports = importClauses.filter(({ path }) => path !== override);
                const priorityImports = importClauses.filter(({ path }) => path === override);

                importClauses = [...priorityImports, ...originalImports];

            }

        });

    }

    return importClauses;

};
