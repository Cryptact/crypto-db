/**
 *** symbols
 ***
 *** Copyright (C) 2018 Cryptact, LTD.
 **/

const ids = require("./ids");

const symbols = Object.keys(ids).reduce(function(out, id) {
  const symbol = ids[id].symbol;
  out[symbol] = id;
  return out;
}, {});

module.exports = symbols;
