const assert = require("assert");
const fs = require("fs");
module.exports = class {
  static report(bits) {
    bits.forEach(bit => {
      assert(bit.length === 16);
    });
  }

  static writeFile(bits) {
    const ws = fs.createWriteStream("./MyApp.hack");

    bits.forEach(bit => {
      ws.write(bit + "\n");
    });
  }
};
