module.exports = function(input, mask, length) {
  let result = "";

  for (let i = 0; i < length - input.length - 1; i++) {
    result += mask;
  }

  return (result += input);
};
