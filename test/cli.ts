import * as fs from "fs";
import cli from "../src/cli";
import { expect } from "chai";
import { checkOutput } from "./support/helpers";

const queryFilePath = "test/support/query.sql";

describe("CLI", function() {
  it("prints help if no arguments are supplied", function() {
    let output = checkOutput(() => {
      cli.exec([]);
    });

    expect(output.errors).to.not.be.empty;
    expect(output.errors[0]).to.contain("Usage:");
  });

  it("formats a SQL file with no options provided", function() {
    let output = checkOutput(() => {
      cli.exec([queryFilePath]);
    });

    expect(output.errors).to.be.empty;
    expect(output.logs[0]).to.equal(`\
/* This is a comment */
SELECT
    id,
    first_name
FROM
    people
`);
  });

  it("formats a SQL file with options", function() {
    let output = checkOutput(() => {
      cli.exec(["--noComment", "--spaces=2", "--functionCase=lowercase", queryFilePath]);
    });

    expect(output.errors).to.be.empty;
    expect(output.logs[0]).to.equal(`\
SELECT
  id,
  first_name
FROM
  people
`);
  });

  it("formats a file in-place", function() {
    const tmpFile = "test/support/cli_test.sql";
    fs.copyFileSync(queryFilePath, tmpFile);

    let output = checkOutput(() => {
      cli.exec(["--write", "--noComment", "--commaStart", "--spaces=3", tmpFile]);
    });

    expect(output.errors).to.be.empty;
    expect(output.logs[0]).to.contain(tmpFile);

    const updatedContents = fs.readFileSync(tmpFile, { encoding: "utf-8" });
    fs.unlinkSync(tmpFile);
    expect(updatedContents).to.equal(`\
SELECT
   id
   , first_name
FROM
   people
`);
  });
});
