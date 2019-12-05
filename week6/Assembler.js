const Parser = require("./src/Parser");
const readFileLineByLine = require("./src/read-file-line-by-line");
const convertDecBin = require("./src/utils/convert-dec-bin");

module.exports = class {
  /**
   * @param {Parser} parser
   */
  constructor(parser) {
    this.parser = parser;
  }

  convertCmdToBit(cmd, cmdType) {
    let bit;
    switch (cmdType) {
      case "A_COMMAND":
        bit = this.convertAtoBit(cmd);
        break;
      case "C_COMMAND":
        bit = "111000000" + cmd;
        break;
      case "L_COMMAND":
        bit = "";
        break;
      default:
        break;
    }

    return bit;
  }
  convertAtoBit(cmd) {
    const symbolOrNumber = cmd.substr(1);
    // need conver symbol to number, if symbol

    const temp = parseInt(symbolOrNumber);
    const bit = convertDecBin(temp);

    const totalBitLength = 16;

    let resBit = "0";

    for (let i = 0; i < totalBitLength - bit.length - 1; i++) {
      resBit += "0";
    }

    resBit += bit;

    return resBit;
  }
  convertCtoBit(cmd) {}

  convert(fileDir) {
    return readFileLineByLine(fileDir).then(lines => {
      const bits = [];

      lines.forEach(line => {
        const str = sanitize(line);
        if (!str) return;

        const cmd = str;
        const cmdType = this.parser.commandType(cmd);
        const bit = this.convertCmdToBit(cmd, cmdType);
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
