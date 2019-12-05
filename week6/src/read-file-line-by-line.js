const lineReader = require("line-reader");

module.exports = function(filePath, cb) {
  const res = [];

  return new Promise((resolve, reject) => {
    lineReader.eachLine(filePath, function(line, last) {
      res.push(line);

      if (last) {
        if (cb) cb();
        resolve(res);
        return false;
      }
    });
  });
};
