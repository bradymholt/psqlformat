# psqlformat [![Build Status](https://travis-ci.org/bradymholt/psqlformat.svg?branch=master)](https://travis-ci.org/bradymholt/psqlformat)

A PostgreSQL SQL syntax formatter.  This utility is a wrapper for [darold/pgFormatter](https://github.com/darold/pgFormatter) and requires Perl to be available.

## Command Line Interface

To run psqlformat on Node.js, install it first with the following command:

```
npm i -g psqlformat
```

To run it, use this command format:

```
psqlformat [options] [file|dir|glob]*
```

Examples:

```
psqlformat --write --spaces=2 query.sql
psqlformat --commaEnd --spaces=4 db/*.sql
```

When passing a glob as a parameter, it will be expanded by your shell.  If you want to use node glob syntax, you have to quote your parameter (using double quotes if you need it to run in Windows), as follows:

```
psqlformat --noComment "db/**"
```

### npx

Bundled with npm starting in version 5.2, the [npx](https://github.com/zkat/npx) tool can be used to run psqlformat without installing it globally.  If you have installed psqlformat locally (npm install psqlformat), npx will use the installed version and if you have not installed it, the latest version will be pulled down and used automatically.  To use this tool, simply prefix psqlformat with `npx` like this:

```
npx psqlformat --write --spaces=2 query.sql
```

### Options

The command line utility has several options. You can view the options by running `psqlformat -h`.

```
Usage: pgformatter [options] <file/glob ...>

By default, output is written to stdout. (use --write option to edit files
in-place)


Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --write         Edit files in-place. (Beware!)                       [boolean]
  --spaces        Number of spaces to indent the code      [number] [default: 4]
  --maxLength     Maximum length of a query                             [number]
  --commaStart    Use preceding comma in parameter list                [boolean]
  --commaEnd      Use trailing comma in parameter list [boolean] [default: true]
  --noComment     Remove any comments                                  [boolean]
  --functionCase  Case of the function names
         [string] [choices: "unchanged", "lowercase", "uppercase", "capitalize"]
                                                          [default: "unchanged"]
  --keywordCase   Case of the reserved keywords
         [string] [choices: "unchanged", "lowercase", "uppercase", "capitalize"]
                                                          [default: "uppercase"]
  --perlBinPath   The path to the perl executable     [string] [default: "perl"]
```

## Module usage

psqlformat can also be used as a module so that it can be integrated into an existing project.  Simply install it locally like this:

```
npm install psqlformat
```

Then, require it with `require("psqlformat")` and use either the `formatSql` or `formatFiles` method.  Here are the method signatures in TypeScript declaration file format:

```
/**
 *
 * @param fileOrGlob The file path or glob to use (i.e. /tmp/query.sql or *.sql)
 * @param options
 */
export declare function formatFiles(filesOrGlobs: string | string[], editInPlace: boolean, options?: IOptions, log?: (text: string) => void): string;

/**
 * Format SQL
 * @param sqlText The SQL to be formatted
 * @param options
 */
export declare function formatSql(sqlText: string, options?: IOptions): string;

```

Example usage:

```
const psqlformat = require("psqlformat");

// Format SQL text
let formatted = psqlformat.formatSql("select id from people", {
  spaces: 2
 
  /* Other available options:
  maxLength
  commaStart
  commaEnd
  noComment
  functionCase
  keywordCase
  perlBinPath
  */
});

console.log(formatted);

/* Expected Output:
SELECT
  id
FROM
  people
*/

// Format a file
const path = require("path");
psqlformat.formatFiles(path.resolve(__dirname, "query.sql"), true, {    
  spaces: 3 
});

// query.sql file should have been edited in-place.
```

### TypeScript

psqlformat is written using TypeScript and has declaration files (`.d.ts`) available so that if you are using TypeScript in your own project,
you can import psqlformat.  The entry declaration file, dist/index.d.ts, is specified in package.json file under the "types" field and should automatically be recognized by the TypeScript compiler.
