module.exports = class Parser {
  parse() {}

  commandType(cmd) {
    if (cmd.includes("@")) return "A_COMMAND";
    else if (cmd.includes(";") || cmd.includes("=")) return "C_COMMAND";
    else return "L_COMMAND";
  }
};
