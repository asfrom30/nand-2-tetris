const assert = require("assert");

const Parser = require("../../src/Parser");

describe("Assembler", () => {
  describe("convertCtoBit", () => {
    it("A=D;JGT", () => {
      const bit = new Parser().convertCCmdtoBit("M=D+M");
      assert.deepEqual(bit, "1111000010001000");
    });

    it("0;JMP", () => {
      const bit = new Parser().convertCCmdtoBit("0;JMP");
      assert.deepEqual(bit, "1110101010000111");
    });
  });
  describe("_cCommandSplitter", () => {
    it("A=D;JGT", () => {
      const res = new Parser()._cCommandSplitter("A=D;JGT");
      assert.deepEqual(res, { dest: "A", comp: "D", jump: "JGT" });
    });

    it("D;JGT", () => {
      const res = new Parser()._cCommandSplitter("D;JGT");
      assert.deepEqual(res, { dest: undefined, comp: "D", jump: "JGT" });
    });

    it("A=D", () => {
      const res = new Parser()._cCommandSplitter("A=D");
      assert.deepEqual(res, { dest: "A", comp: "D", jump: undefined });
    });

    it("D", () => {
      const res = new Parser()._cCommandSplitter("D");
      assert.deepEqual(res, { dest: undefined, comp: "D", jump: undefined });
    });
  });
});
