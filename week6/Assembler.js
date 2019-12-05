const readFileLineByLine = require("./src/read-file-line-by-line");

module.exports = class {
  constructor() {}

  convert(fileDir) {
    return readFileLineByLine(fileDir).then(lines => {
      const bits = [];

      lines.forEach(line => {
        const str = sanitize(line);
        if (!str) return;

        const cmd = str;
        bits.push(noSymbolAssembler(cmd));
      });
      return bits;
    });
  }
};

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
