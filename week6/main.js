const readFileLineByLine = require("./src/read-file-line-by-line");

const targetDir = "./tests/e2e/pong/PongL.asm";
readFileLineByLine(targetDir).then(lines => {
  const res = [];

  lines.forEach(line => {
    const str = sanitize(line);
    if (!str) return;

    const cmd = str;
    res.push(noSymbolAssembler(cmd));
  });

  console.log(res); // reporter
});

function noSymbolAssembler(line) {
  return line + " :: " + commandType(line);
}

function commandType(cmd) {
  if (cmd.includes("@")) return "A_COMMAND";
  else if (cmd.includes(";") || cmd.includes("=")) return "C_COMMAND";
  else return "L_COMMAND";
}

function sanitize(line) {
  if (line.includes("//")) return false;

  return line;
}
