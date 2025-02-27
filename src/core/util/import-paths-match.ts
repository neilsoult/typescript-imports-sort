import { MappedImport } from '../interfaces';

export const importPathsMatch = (a: MappedImport, b: MappedImport): boolean => {
    return a.importClause.path === b.importClause.path;
};
