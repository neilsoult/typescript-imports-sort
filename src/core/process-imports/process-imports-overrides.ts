import { TypescriptImport } from '../interfaces';
import { options } from '../options/index';

export const processImportsOverrides = (importClauses: TypescriptImport[]): TypescriptImport[] => {
  if (options.get('pathSortOrderOverride') && options.get('pathSortOrderOverride').length > 0) {
    options.get('pathSortOrderOverride').reverse().forEach(p => {
      if (importClauses.some(i => i.path === p)) {
        const originalImports = importClauses.filter(i => i.path != p)
        const priorityImports = importClauses.filter(i => i.path === p)
        importClauses.length = 0;
        importClauses.push(...priorityImports)
        importClauses.push(...originalImports)
      }
    })
  }

  return importClauses
};