const assert = require("assert");
const readFileLineByLine = require("../../src/read-file-line-by-line");

describe("Line Reader", () => {
  it("read line", () => {
    readFileLineByLine("sample.txt").then(lines => {
      assert(lines.length, 5);
    });
  });
});
