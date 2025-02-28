# Change Log

## [1.17.1]

- fixed parsing of inline `type` keyword in destructured imports (e.g., `import { type Observable } from 'rxjs'`)

## [1.17.0]

- fixes trailing comma support [Issue #](https://github.com/neilsoult/typescript-imports-sort/issues/7), [Issue #](https://github.com/neilsoult/typescript-imports-sort/issues/14)
- fixes pathSortOrderOverride bug [Issue #](https://github.com/neilsoult/typescript-imports-sort/issues/16)

## [1.16.1]

- fixed combining `import type` named imports when path is the same

## [1.16.0]

- fixed issue where duplicate import paths were not removed
- support for `import type` syntax

## [1.15.0]

- add support for type keyword from [typescript 3.8](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html)

## [1.4.1]

- Fix previous change by adding contribution points to package.json

## [1.4.0]

- Added the ability to sort ES6-style imports in JavaScript [rickyp-uber]

## [1.3.0]

- Added configuration option to omit the semicolon at the end of the import clause.

## [1.2.1]

- Fix bug with package paths that contained an `@` symbol
- Fix bug that would add a newline to the beginning of any file without import statements

## [1.2.0]

- Added the ability to configure how sorting by import path is done.
- Fixed a bug where the extension would process non-Typescript files when saving

## [1.1.0]

- Added the option to sort imports whenever you save, controlled by the `typescript.extension.sortImports.sortOnSave` setting (`false` by default).

## [1.0.0]

- Initial release
