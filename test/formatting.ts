import { formatSql, formatFiles } from "../src/index";
import { expect } from "chai";

describe("formatting", function () {
  it("returns formatted SQL given SQL text", function () {
    expect(
      formatSql(`\
PERFORM my_nifty_function(id, name);
\
`)
    ).to.equal(`\
PERFORM
    my_nifty_function (id, name);

`);
  });

  it("respects the extraFunction option", function () {
    expect(
      formatSql(
        `\
PERFORM my_nifty_function(id, name);
\
`,
        { extraFunction: "test/support/extraFunction" }
      )
    ).to.equal(`\
PERFORM
    my_nifty_function(id, name);

`);
  });

  it("respects the configFile option", function () {
    expect(
      formatSql(
        `\
-- comment
PERFORM my_nifty_function(id, name);
\
`,
        { configFile: "test/support/pg_format.conf" }
      )
    ).to.equal(`\
-- comment
PERFORM
    my_nifty_function (id, name);

`);
  });

  it("respects the pgFormatterPath option", function () {
    expect(
      formatSql(
        `\
PERFORM my_nifty_function(id, name);
\
`,
        { pgFormatterPath: "test/support/hello_world" }
      )
    ).to.equal(`\
Hello, World!
`);
  });

  it("respects the noSpaceFunction option", function () {
    expect(
      formatSql(
        `\
PERFORM schema.some_func(arg);
\
`,
        { noSpaceFunction: true }
      )
    ).to.equal(`\
PERFORM
    schema.some_func(arg);

`);
  });
});
