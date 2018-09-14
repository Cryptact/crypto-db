/**
 * exporting map_for_coverage
 *
 * Copyright (C) 2018 Cryptact, LTD.
 */

// ls | sed -e "s/^/\"/g" -e "s/\.json/\",/g"
const namespaces = [
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

module.exports = namespaces.reduce(
  (all, ns) => (all[ns] = require("./" + ns)),
  {}
);
