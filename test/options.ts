import { IOptions, CaseOptionEnum } from "../src/options";
import { buildCommandArguments } from "../src/index";
import { expect } from "chai";

describe("options", function() {
  it("anonymize", function() {
    expect(buildCommandArguments({ anonymize: true })).to.contain("--anonymize");
  });

  it("commaStart", function() {
    expect(buildCommandArguments({ commaStart: true })).to.contain("--comma-start");
  });

  it("commaEnd", function() {
    expect(buildCommandArguments({ commaEnd: true })).to.contain("--comma-end");
  });

  it("commaStart and commaEnd", function() {
    const commandArgs = buildCommandArguments({ commaStart: true, commaEnd: true });
    expect(commandArgs).to.contain("--comma-start");
    expect(commandArgs).not.to.contain("--comma-end");
  });

  it("functionCase", function() {
    expect(buildCommandArguments({ functionCase: CaseOptionEnum.lowercase })).to.contain("--function-case 1");
  });

  it("maxLength", function() {
    expect(buildCommandArguments({ maxLength: 120 })).to.contain("--maxlength 120");
  });

  it("maxLength", function() {
    expect(buildCommandArguments({ maxLength: 120 })).to.contain("--maxlength 120");
  });

  it("maxLength", function() {
    expect(buildCommandArguments({ maxLength: 120 })).to.contain("--maxlength 120");
  });
});
