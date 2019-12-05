const Parser = require("./src/Parser");
const readFileLineByLine = require("./src/read-file-line-by-line");

module.exports = class {
  /**
   * @param {Parser} parser
   */
  constructor(parser) {
    this.parser = parser;
  }

  convert(fileDir) {
    return readFileLineByLine(fileDir).then(lines => {
      const bits = [];

      lines.forEach(line => {
        const str = sanitize(line);
        if (!str) return;

        const cmd = str;
        const cmdType = this.parser.commandType(cmd);
        const bit = this.parser.convertCmdToBit(cmd, cmdType);
        bits.push(bit);
      });
      return bits;
    });
  }
};

function sanitize(line) {
  if (line.includes("//")) return false;

  return line;
}
