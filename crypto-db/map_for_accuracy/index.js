/**
 * exporting map_for_accuracy
 *
 * Copyright (C) 2018 Cryptact, LTD.
 */

// ls | sed -e "s/^/\"/g" -e "s/\.json/\",/g"
const namespaces = [
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

module.exports = namespaces.reduce(
  (all, ns) => (all[ns] = require("./" + ns)),
  {}
);

