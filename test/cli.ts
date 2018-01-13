import cli from "../src/cli";
import { expect } from "chai";
import { checkOutput } from "./helpers";

describe("cli", function() {
  it("prints help if no arguments are supplied", function() {
    let output = checkOutput(() => {
      cli.exec([], console.log);
    });

    expect(output.errors).to.not.be.empty;
    expect(output.errors[0]).to.contain("Usage:");
  });
});
