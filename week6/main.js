const Assembler = require("./Assembler");
const Parser = require("./src/Parser");
const Reporter = require("./src/Reporter");

const targetDir = "./tests/e2e/pong/PongL.asm";

const parser = new Parser();

new Assembler(parser).convert(targetDir).then(bits => {
  Reporter.report(bits);
  Reporter.writeFile(bits);
});
