const assert = require("assert");

const Assembler = require("../../Assembler");

describe("Assembler", () => {
  describe("convertCtoBit", () => {
    it("A=D;JGT", () => {
      const bit = new Assembler().convertCtoBit("M=D+M");
      assert.deepEqual(bit, "1111000010001000");
    });

    it("0;JMP", () => {
      const bit = new Assembler().convertCtoBit("0;JMP");
      assert.deepEqual(bit, "1110101010000111");
    });
  });
  describe("_cCommandSplitter", () => {
    it("A=D;JGT", () => {
      const res = new Assembler()._cCommandSplitter("A=D;JGT");
      assert.deepEqual(res, { dest: "A", comp: "D", jump: "JGT" });
    });

    it("D;JGT", () => {
      const res = new Assembler()._cCommandSplitter("D;JGT");
      assert.deepEqual(res, { dest: undefined, comp: "D", jump: "JGT" });
    });

    it("A=D", () => {
      const res = new Assembler()._cCommandSplitter("A=D");
      assert.deepEqual(res, { dest: "A", comp: "D", jump: undefined });
    });

    it("D", () => {
      const res = new Assembler()._cCommandSplitter("D");
      assert.deepEqual(res, { dest: undefined, comp: "D", jump: undefined });
    });
  });
});
