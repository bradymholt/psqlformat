import * as fs from "fs";
import { formatSql, formatFiles } from "../src/index";
import { expect } from "chai";

const queryFilePath = "test/support/query.sql";
const queryFile2Path = "test/support/query2.sql";

describe("module", function () {
  it("returns formatted SQL given SQL text", function () {
    expect(formatSql("SELECT id FROM animals")).to.equal(`\
SELECT
    id
FROM
    animals
`);
  });

  it("uses tabs", function () {
    expect(formatSql("SELECT id FROM animals", { tabs: true })).to.equal(`\
SELECT
\tid
FROM
\tanimals
`);
  });

  it("returns formatted SQL given a file path", function () {
    let output = formatFiles(queryFilePath, false, { noComment: true, spaces: 2 });
    expect(output).to.equal(`\
SELECT
  id,
  first_name
FROM
  people
`);
  });

  it("formats a file in-place", function () {
    const tmpFile = "test/support/module_test.sql";
    fs.copyFileSync(queryFilePath, tmpFile);

    let logContents = "";
    let testLog = function (message: string) {
      logContents += message;
    };
    let output = formatFiles(tmpFile, true, { noComment: true, spaces: 3 }, testLog);

    const updatedContents = fs.readFileSync(tmpFile, { encoding: "utf-8" });

    fs.unlinkSync(tmpFile);

    expect(logContents).to.contain(tmpFile);
    expect(updatedContents).to.equal(`\
SELECT
   id,
   first_name
FROM
   people
`);
  });

  it("formats a file with in-place and removes dash-dash comments", function () {
    const tmpFile = "test/support/module_test.sql";
    fs.copyFileSync(queryFile2Path, tmpFile);

    let logContents = "";
    let testLog = function (message: string) {
      logContents += message;
    };
    let output = formatFiles(tmpFile, true, { noComment: true, spaces: 3 }, testLog);

    const updatedContents = fs.readFileSync(tmpFile, { encoding: "utf-8" });

    fs.unlinkSync(tmpFile);

    expect(logContents).to.contain(tmpFile);
    expect(updatedContents).to.equal(`\
SELECT
   id,
   first_name
FROM
   people
`);
  });

  it("formats multiple files in-place", function () {
    const multipleFiles = [
      "test/support/module_test01.sql",
      "test/support/module_test02.sql",
      "test/support/module_test03.sql",
      "test/support/module_test04.sql",
    ]
    for (const tmpFile of multipleFiles) {
      fs.copyFileSync(queryFilePath, tmpFile);
    }

    const expectedFormattedContent = `\
SELECT
  id,
  first_name
FROM
  people
`;
    let stdout = "";
    let logger = function (message: string) {
      stdout += message;
    };
    formatFiles(multipleFiles, true, { noComment: true, spaces: 2, write: true, chunkSize: 3 }, logger);

    // assert all the file contents were updated as expected
    for (const tmpFile of multipleFiles) {
      const updatedContents = fs.readFileSync(tmpFile, { encoding: "utf-8" });
      expect(updatedContents).to.equal(expectedFormattedContent);
      fs.unlinkSync(tmpFile);
    }

    // and that the stdout included all the filenames, and some timing info
    const stdoutLines = stdout.split("\n");
    const expectedStdoutLineSubstrings = [
      "[3 files in ",
      multipleFiles[0],
      multipleFiles[1],
      multipleFiles[2],
      "[1 files in ",
      multipleFiles[3],
    ];
    for (let i = 0; i < expectedStdoutLineSubstrings.length; i++) {
      expect(stdoutLines[i]).to.contain(expectedStdoutLineSubstrings[i]);
    }
  });
});
