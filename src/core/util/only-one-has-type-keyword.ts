import { MappedImport } from '../interfaces';

export const onlyOneHasTypeKeyword = (
    { importClause: { hasTypeKeyword: a } }: MappedImport,
    { importClause: { hasTypeKeyword: b } }: MappedImport
): boolean => {

    return (a || b) && !(a && b);
};
