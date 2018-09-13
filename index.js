/**
 * exporting crypto-db
 *
 * Copyright (C) 2018 Cryptact, LTD.
 */
const crypto_db = require("./crypto-db/crypto-db");
const crypto_actions = require("./crypto-db/crypto-actions");

const composite = require("./crypto-db/composite");
const map_for_accuracy = require("./crypto-db/map_for_accuracy");
const map_for_coverage = require("./crypto-db/map_for_coverage");

console.log("%j", map_for_accuracy);
module.exports = {
  crypto_db,
  crypto_actions,
  composite,
  map_for_accuracy,
  map_for_coverage
};
