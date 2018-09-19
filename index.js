/**
*** crypto-db package
***
*** Copyright (C) 2018 Cryptact, LTD.
**/

const namespace = [
  "ids",
  "composite",
  "crypto_actions",
  "map_for_accuracy",
  "map_for_coverage",
  "symbols"
];

module.exports = namespace.reduce(function (o, key) {
  o[key] = require(`./lib/${key}`);
  return o;
}, {});
