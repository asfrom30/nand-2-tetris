const Parser = require("./src/Parser");
const readFileLineByLine = require("./src/read-file-line-by-line");
const convertDecBin = require("./src/utils/convert-dec-bin");
const stringMask = require("./src/utils/string-mask");

const compMap = {
  "0": "0101010",
  "1": "0111111",
  "-1": "0111010",
  D: "0001100",
  A: "0110000",
  "!D": "0001101",
  "!A": "0110001",
  "-D ": "0001111",
  "-A ": "0110011",
  "D+1": "0011111",
  "A+1": "0110111",
  "D-1": "0001110",
  "A-1": "0110010",
  "D+A": "0000010",
  "D-A": "0010011",
  "A-D": "0000111",
  "D&A": "0000000",
  "D|A": "0010101",
  M: "1110000",
  "!M": "1110001",
  "-M ": "1110011",
  "M+1": "1110111",
  "M-1": "1110010",
  "D+M": "1000010",
  "D-M": "1010011",
  "M-D": "1000111",
  "D&M": "1000000",
  "D|M": "1010101"
};

const destMap = {
  null0: "000",
  M: "001",
  D: "010",
  MD: "011",
  A: "100",
  AM: "101",
  AD: "110",
  AMD: "111"
};

const jumpMap = {
  null: "000",
  JGT: "001",
  JEQ: "010",
  JGE: "011",
  JLT: "100",
  JNE: "101",
  JLE: "110",
  JMP: "111"
};
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
        bit = this.convertCtoBit(cmd);
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
    const { dest, comp, jump } = this._cCommandSplitter(cmd);

    const c = compMap[comp] || "";
    const d = destMap[dest] || "000";
    const j = jumpMap[jump] || "000";
    return "111" + c + d + j;
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
