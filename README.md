


# Sort Typescript imports

Sort import statements in Typescript code

## Features

This configurable extension allows you to sort all the imports in a *.ts or *.tsx file.

> Tip: You can access this functionality either from the context menu, or simply pressing 'F10'

## Extension Settings

* `typescript.extension.sortImports.bracketWhitespace`: If set to false whitespace will not be included in single line imports. Default: `true`
* `typescript.extension.sortImports.enableJavascript`: If set to `true`, the extension will attempt to sort ES6-style imports in Javascript files. Default: `false`
* `typescript.extension.sortImports.forceTrailingCommas`: Add the ability to use trailing commas in named import lists.
  * Default: `never`
  * `never` - never add any trailing commas.
  * `always` - always add trailing commas.
  * `singleLineOnly` - only add trailing commas to single line lists.
  * `multiLineOnly` - only add trailing commas to muti-line lists.
* `typescript.extension.sortImports.maxLineLength`: The max character count allowed in a single line named import statement. Can override `maxNamedImportsInSingleLine`. (This rule has precedence) Please Note: this only applies to single line named imports, it does not check line length on multi-line import statements or default imports.
  * Default: `0` (no max length)
* `typescript.extension.sortImports.maxNamedImportsInSingleLine`: The number of named imports to allow on a single line. If a single import has more than this number, they will be broken up onto separate lines.
    * Default: `0` (ignore rule)
* `typescript.extension.sortImports.multilineIndention`: Control when to add indentation to multi-line imports.
  * Default: `namesOnly`
  * `none` - do not add indentation to multi-line imports.
  * `namesOnly` - only add indentation to the lines with named imports.
  * `namesAndPath` - add indentation to both the lines with named imports and the final line with the closing bracket and path.
* `typescript.extension.sortImports.omitSemicolon`: If set to `true`, the trailing semicolon will be omitted. Default: `false`
* `typescript.extension.sortImports.pathSortOrder`: An array describing the order in which imports should be sorted by paths. Only applicable if `sortMethod` is set to `path`.
  * Default: `["relativeDownLevel", "relativeUpLevel", "package"]`
  * `package` - Any import path that does not begin with `.`
  * `relativeUpLevel` - Any import path that begins with `../`
  * `relativeDownLevel` - Any import path that begins with `./`
* `typescript.extension.sortImports.quoteStyle`: The type of quotation mark to use. `single`(default) or `double`.
* `typescript.extension.sortImports.sortMethod`: The method to use for sorting the imports.
  * `'importName'`(default) sorts by the type and name of the import. Namespace imports are first, followed by default imports, named imports, and unnamed imports.
  * `'fileName'` sorts by the file name in the import-path
  * `'path'` sorts by the import path, sorting relative-path imports above package imports
* `typescript.extension.sortImports.sortOnSave`: If set to `true`, imports will be sorted whenever you save a file. Default: `false`

## Inline Settings
* You can use the flag `disable-sort-imports` in comments to disable sorting for that page. This is especially useful if you have the `sortOnSave` set to true

## Known Issues

* This extension does not currently sort comments within the import block along with the import statements

## Future roadmap
- Handle distinct blocks of imports separated by a blank line.
- Handle comments within import blocks
- Read settings from existing tslint configuration.
- Maybe none of these. ¯\\_(ツ)_/¯

## Release Notes

## 1.13.0
- added support for tilde (`~`) character starting import path strings, as requested by [Issue #9](https://github.com/neilsoult/typescript-imports-sort/issues/9)
- updated packages

## 1.12.1
- fixed import bug.

## 1.12.0
- `maxNamedImportsInSingleLine` will now be ignored if value is 0
- refactored code; created interface for options

## 1.11.0
- added `fileName` option for `sortMethod`, as requested by [Issue #3](https://github.com/neilsoult/typescript-imports-sort/issues/3)
- fixed [issue #4](https://github.com/neilsoult/typescript-imports-sort/issues/4). Extra spaces in named imports will now be sorted correctly
- tweaked the regex to include trailing comments in the matcher (they still are not written to the output when sorted).

## 1.10.0
- added `maxLineLength` option. This only applies to single-line imports and will take precedence over `maxNamedImportsInSingleLine`

## 1.9.0
- added inline flag `disable-sort-imports` to disable sorting imports for that page
- more refactoring, code organization

## 1.8.0
- added trailing commas option

## 1.7.0
- Added configuration option to control indention on multi-line imports.
- General code style change to conform to my preferences.

## 1.5.0
- Added configuration option to remove whitespace for single line imports. Thank you Matthew Gerstman.

## 1.3.0
- Added configuration option to omit the semicolon at the end of the import clause.

### 1.2.0
- Added the ability to configure how sorting by import path is done.

### 1.1.0
- Added the option to sort imports whenever you save, controlled by the `typescript.extension.sortImports.sortOnSave` setting (`false` by default).

### 1.0.0

Initial release
