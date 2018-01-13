import * as fs from "fs";
import { formatSql, formatFiles } from "../src/index";
import { expect } from "chai";

const queryFilePath = "test/support/query.sql";

describe("module", function() {
  it("returns formatted SQL given SQL text", function() {
    expect(formatSql("SELECT id FROM animals")).to.equal(`\
SELECT
    id
FROM
    animals
`);
  });

  it("returns formatted SQL given a file path", function() {
    let output = formatFiles(queryFilePath, { noComment: true, spaces: 2 });
    expect(output).to.equal(`\
SELECT
  id,
  first_name
FROM
  people
`);
  });

  it("formats a file in-place", function() {
    const tmpFile = "test/support/module_test.sql";
    fs.copyFileSync(queryFilePath, tmpFile);

    let logContents = "";
    let testLog = function(message: string) {
      logContents += message;
    };
    let output = formatFiles(tmpFile, { write: true, noComment: true, spaces: 3 }, testLog);

    const updatedContents = fs.readFileSync(tmpFile, { encoding: "utf-8" });
    
    expect(logContents).to.contain(tmpFile);
    expect(updatedContents).to.equal(`\
SELECT
   id,
   first_name
FROM
   people
`);

    fs.unlinkSync(tmpFile);
  });
});
