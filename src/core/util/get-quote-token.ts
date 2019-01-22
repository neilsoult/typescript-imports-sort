import { options } from '../options';

export const getQuoteToken = (): `"` | `'` => {

    switch (options.get('quoteStyle')) {

        case 'double':
            return `"`;
        case 'single':
        default:
            return `'`;

    }

};
