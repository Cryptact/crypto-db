/**
 * exporting crypto-db
 *
 * Copyright (C) 2018 Cryptact, LTD.
 */

// ls | sed -e "s/^/\"/g" -e "s/\.json/\",/g"
const composite_namespaces = ["cryptact"];

const map_for_accuracy_namespaces = [
  "bigone",
  "binance",
  "bitbank",
  "bitfinex",
  "bitflyer",
  "bitgrail",
  "bitpoint",
  "bittrex",
  "bitz",
  "coinbase",
  "coincheck",
  "coinex",
  "coinexchange",
  "coinmarketcap",
  "cryptact",
  "cryptocompare",
  "cryptopia",
  "fcoin",
  "gmocoin",
  "hitbtc",
  "huobi",
  "jpwhitelist",
  "kraken",
  "krakenalt",
  "kucoin",
  "liquid",
  "mercatox",
  "novaexchange",
  "poloniex",
  "stocksexchange",
  "yobit",
  "zaif"
];
const map_for_coverage_namespaces = [
  "bigone",
  "binance",
  "bitbank",
  "bitfinex",
  "bitgrail",
  "bitpoint",
  "bittrex",
  "coinex",
  "coinexchange",
  "coinmarketcap",
  "cryptact",
  "cryptocompare",
  "cryptopia",
  "fcoin",
  "hitbtc",
  "huobi",
  "kraken",
  "krakenalt",
  "kucoin",
  "mercatox",
  "poloniex",
  "yobit",
  "zaif"
];

const crypto_db = require("./crypto-db/crypto-db");
const crypto_actions = require("./crypto-db/crypto-actions");

const map_for_accuracy = {};
map_for_accuracy_namespaces.forEach(element => {
  map_for_accuracy[element] = require("./crypto-db/map_for_accuracy/" +
    element);
});

const map_for_coverage = {};
map_for_coverage_namespaces.forEach(element => {
  map_for_coverage[element] = require("./crypto-db/map_for_coverage/" +
    element);
});

const composite = {};
composite_namespaces.forEach(element => {
  composite[element] = require("./crypto-db/composite/" + element);
});

console.log("%j", map_for_accuracy)
module.exports = {
  crypto_db,
  crypto_actions,
  composite,
  map_for_accuracy,
  map_for_coverage
};
