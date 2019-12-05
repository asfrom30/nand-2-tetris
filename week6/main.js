const readFileLineByLine = require("./src/read-file-line-by-line");

const targetDir = "./tests/e2e/pong/PongL.asm";
readFileLineByLine(targetDir).then(lines => {
  const bits = lines.map(line => noSymbolAssembler(line));
  // reporter
  console.log(bits);
});

function noSymbolAssembler(line) {
  return line;
}
