/**
 * exporting crypto-db
 *
 * Copyright (C) 2018 Cryptact, LTD.
 */
const crypto_db = require("./lib/ids");
const crypto_actions = require("./lib/crypto-actions");

const composite = require("./lib/composite");
const map_for_accuracy = require("./lib/map_for_accuracy");
const map_for_coverage = require("./lib/map_for_coverage");

module.exports = {
  crypto_db,
  crypto_actions,
  composite,
  map_for_accuracy,
  map_for_coverage
};
