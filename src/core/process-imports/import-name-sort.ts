import { sortByPath, sortNamedImports } from './sort-factory';
import { MappedImport } from '../interfaces';
import { options } from '../options/index';
import { compareCaseInsensitive } from '../util/index';

const otherSort = (a: MappedImport, b: MappedImport): number => {

    // console.log('otherSort');
    const namedImportsCompare = sortByNamedImports(a, b);
    if (namedImportsCompare) {

        return namedImportsCompare;

    }
    const pathSortCompare = sortByPathSortOrdering(a, b);
    if (pathSortCompare) {

        return pathSortCompare;

    }
    // fall through here means they are likely dupes, but I'm not sure it's reliable enough to remove.
    return 0;

};

const sortBy = (type: 'namespace' | 'default'): (a: MappedImport, b: MappedImport) => number => {

    return (a: MappedImport, b: MappedImport): number => {

        const compare = compareCaseInsensitive(a.importClause[type], b.importClause[type]);
        if (compare) {

            return compare;

        }
        // fall through means the namespaces/defaults are the same
        // even though this would produce an error in the user's file, we can still sort it according to path
        // and if the paths are the same, then we can consider one a dupe and remove it
        return sortByPath(a, b);

    };

};

const sortByNamedImports = ({ importClause: a }: MappedImport, { importClause: b }: MappedImport): number => {

    if (a.namedImports && b.namedImports) {

        a.namedImports.sort(sortNamedImports);
        b.namedImports.sort(sortNamedImports);

        const maxIdx = Math.min(a.namedImports.length, b.namedImports.length);
        for (let i = 0; i < maxIdx; i++) {

            const compare = compareCaseInsensitive(a.namedImports[i].importName, b.namedImports[i].importName);
            if (compare) {

                return compare;

            }

        }
        return a.namedImports.length - b.namedImports.length;

    }
    if (a.namedImports) {

        return -1;

    }
    if (b.namedImports) {

        return 1;

    }

};

const sortByPathSortOrdering = (
    { pathSortCategory: a }: MappedImport, { pathSortCategory: b }: MappedImport
): number => {

    const sortOrder = options.get('pathSortOrder');

    return sortOrder.indexOf(a) - sortOrder.indexOf(b);

};

export const importNameSort = (mappedImports: MappedImport[]): MappedImport[] => {

    return [
        ...mappedImports.filter(({ importClause }) => importClause.namespace).sort(sortBy('namespace')),
        ...mappedImports.filter(({ importClause }) => importClause.default).sort(sortBy('default')),
        ...mappedImports.filter(({ importClause }) => !importClause.default && !importClause.namespace).sort(otherSort)
    ];

};
