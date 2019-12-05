const assert = require("assert");
const Assembler = require("./Assembler");
const Parser = require("./src/Parser");

const targetDir = "./tests/e2e/pong/PongL.asm";

const parser = new Parser();
new Assembler(parser).convert(targetDir).then(bits => {
  bits.forEach(bit => {
    assert(bit.length === 16);
  });
});
