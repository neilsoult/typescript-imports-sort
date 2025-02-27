import { getExtensionConfig } from './get-extension-config';
import { ExtensionOptions, ExtensionOptionsKey } from '../interfaces';

const getOption = <K extends ExtensionOptionsKey>(option: K): ExtensionOptions[K] => {
    return getExtensionConfig().get(option);
};

export const options = { get: getOption };
