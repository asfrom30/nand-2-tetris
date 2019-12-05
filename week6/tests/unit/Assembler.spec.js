const assert = require("assert");

const Assembler = require("../../Assembler");

describe("Assembler", () => {
  describe("_cCommandSplitter", () => {
    it("A=D;JGT", () => {
      const bit = new Assembler()._cCommandSplitter("A=D;JGT");
      assert.deepEqual(bit, { dest: "A", comp: "D", jump: "JGT" });
      // assert(bit, "1110101010000111");
    });

    it("D;JGT", () => {
      const bit = new Assembler()._cCommandSplitter("D;JGT");
      assert.deepEqual(bit, { dest: undefined, comp: "D", jump: "JGT" });
      // assert(bit, "1110101010000111");
    });

    it("A=D", () => {
      const bit = new Assembler()._cCommandSplitter("A=D");
      assert.deepEqual(bit, { dest: "A", comp: "D", jump: undefined });
    });

    it("D", () => {
      const bit = new Assembler()._cCommandSplitter("D");
      assert.deepEqual(bit, { dest: undefined, comp: "D", jump: undefined });
    });
  });
});
