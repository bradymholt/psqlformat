# psqlformat

A PostgreSQL SQL syntax beautifier.  This is a wrapper for [darold/psqlformat](https://github.com/darold/psqlformat) and requires Perl to be available.

## Examples

### Module

```
npm install psqlformat
```

```
import { formatSql } from "@bradymholt/psqlformat";
let formatted = formatSql("select id from people", { spaces: 2 });
console.log(formatted);

/* Output:
SELECT
  id
FROM
  people
*/
```

### CLI

```
npx psqlformat --write --spaces=2 query.sql

query.sql [32ms]
```

## Options

| Name         | Type                                                         | Default     | Description                           | 
|--------------|--------------------------------------------------------------|-------------|---------------------------------------| 
| write        | boolean                                                      | false       | Edit files in-place. (Beware!)        | 
| spaces       | number                                                       | 4           | Number of spaces to indent the code   | 
| maxLength    | number                                                       | null        | Maximum length of a query             | 
| commaStart   | boolean                                                      | false       | Use preceding comma in parameter list | 
| commaEnd     | boolean                                                      | true        | Use trailing comma in parameter list  | 
| noComment    | boolean                                                      | false       | Remove any comments                   | 
| functionCase | string ("unchanged", "lowercase", "uppercase", "capitalize") | "unchanged" | Case of the function names            | 
| keywordCase  | string ("unchanged", "lowercase", "uppercase", "capitalize") | "uppercase" | Case of the reserved keywords         | 
| perlBinPath  | string                                                       | "perl"      | The path to the perl executable       | 
