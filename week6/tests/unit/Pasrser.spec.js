const assert = require("assert");
const Parser = require("../../src/Parser");

describe("Parser.commandType", () => {
  it("", () => {
    const type = new Parser().commandType("@15");
    assert(type, "A_COMMAND");
  });
});
