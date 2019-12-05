var ConvertBase = function(num) {
  return {
    from: function(baseFrom) {
      return {
        to: function(baseTo) {
          return parseInt(num, baseFrom).toString(baseTo);
        }
      };
    }
  };
};

module.exports = function(num) {
  return ConvertBase(num)
    .from(10)
    .to(2);
};
