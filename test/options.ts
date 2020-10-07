import { IOptions, CaseOptionEnum } from "../src/options";
import { buildCommandArguments, buildCommand } from "../src/index";
import { expect } from "chai";

describe("options", function () {
  it("write", function () {
    // write argument is not passed pgFormatter but is used internally
    expect(buildCommandArguments({ write: true })).not.to.contain("write");
  });

  it("commaStart", function () {
    expect(buildCommandArguments({ commaStart: true })).to.contain("--comma-start");
  });

  it("commaBreak", function () {
    expect(buildCommandArguments({ commaBreak: true })).to.contain("--comma-break");
  });

  it("commaEnd", function () {
    expect(buildCommandArguments({ commaEnd: true })).to.contain("--comma-end");
  });

  it("commaStart and commaEnd", function () {
    const commandArgs = buildCommandArguments({ commaStart: true, commaEnd: true });
    expect(commandArgs).to.contain("--comma-start");
    expect(commandArgs).not.to.contain("--comma-end");
  });

  it("functionCase", function () {
    expect(buildCommandArguments({ functionCase: CaseOptionEnum.lowercase })).to.contain("--function-case 1");
  });

  it("noGrouping", function () {
    expect(buildCommandArguments({ noGrouping: true })).to.contain("--nogrouping");
  });

  it("maxLength", function () {
    expect(buildCommandArguments({ maxLength: 120 })).to.contain("--maxlength 120");
  });

  it("noComment", function () {
    expect(buildCommandArguments({ noComment: true })).to.contain("--nocomment");
  });

  it("spaces", function () {
    expect(buildCommandArguments({ spaces: 6 })).to.contain("--spaces 6");
  });

  it("formatType", function () {
    expect(buildCommandArguments({ formatType: true })).to.contain("--format-type");
  });

  it("wrapLimit", function () {
    expect(buildCommandArguments({ wrapLimit: 80 })).to.contain("--wrap-limit 80");
  });

  it("placeholder", function () {
    expect(buildCommandArguments({ placeholder: "/test123/" })).to.contain("--placeholder '/test123/'");
  });

  it("extraFunction", function () {
    expect(buildCommandArguments({ extraFunction: "/test123/test456" })).to.contain(
      "--extra-function '/test123/test456'"
    );
  });

  it("configFile", function () {
    expect(buildCommandArguments({ configFile: "/test123/conf" })).to.contain("--config '/test123/conf'");
  });

  it("perlBinPath", function () {
    expect(buildCommand({ perlBinPath: "/usr/bin/custom" })).contain("/usr/bin/custom");
    expect(buildCommand({ perlBinPath: "/usr/bin/custom" })).to.not.contain("perl");
  });

  it("pgFormatterPath", function () {
    expect(buildCommand({ pgFormatterPath: "/usr/bin/custom" })).contain("/usr/bin/custom");
    expect(buildCommand({ pgFormatterPath: "/usr/bin/custom" })).to.not.contain("pg_format");
  });
});
