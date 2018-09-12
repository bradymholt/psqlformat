import { formatSql, formatFiles } from "../src/index";
import { expect } from "chai";

describe("formatting", function() {
  it("returns formatted SQL given SQL text", function() {
    expect(
      formatSql(`\
PERFORM my_nifty_function(id, name);
\
`)
    ).to.equal(`\
PERFORM
    my_nifty_function (id,
        name);

`);
  });
});
