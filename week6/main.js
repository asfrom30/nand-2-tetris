const Assembler = require("./Assembler");

const targetDir = "./tests/e2e/pong/PongL.asm";
new Assembler().convert(targetDir).then(bits => console.log(bits));
