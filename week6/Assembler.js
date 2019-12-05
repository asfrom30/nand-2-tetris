const Parser = require("./src/Parser");
const readFileLineByLine = require("./src/read-file-line-by-line");
const convertDecBin = require("./src/utils/convert-dec-bin");
const stringMask = require("./src/utils/string-mask");

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
        bit = cmd;
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

    return "0" + stringMask(bit, "0", totalBitLength);
  }

  convertCtoBit(cmd) {
    const obj = this._cCommandSplitter(cmd);
  }

  _cCommandSplitter(cmd) {
    let dest, comp, jump;

    if (cmd.indexOf("=") > -1) {
      const temps = cmd.split("=");
      (dest = temps[0]), (cmd = temps[1]);
    }

    if (cmd.indexOf(";") > -1) {
      const temps = cmd.split(";");
      (comp = temps[0]), (jump = temps[1]);
    } else {
      comp = cmd;
    }

    return { dest, comp, jump };
  }

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
