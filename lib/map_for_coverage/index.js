/**
 *** map_for_coverage
 ***
 *** Copyright (C) 2018 Cryptact, LTD.
 **/

const symbols = require("../symbols");

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
  "lbank",
  "liqui",
  "mercatox",
  "poloniex",
  "yobit",
  "zaif"
];

function getCryptoId(ns_id, ts) {
  const hits = this.map.filter(pair => {
    return (
      pair.ns_id === ns_id &&
      (!pair.from || pair.from <= ts) &&
      (!pair.to || pair.to > ts)
    );
  });
  return (hits.length && hits[0].id) || symbols[ns_id];
}

const map_for_coverage = namespaces.reduce(function(out, ns) {
  out[ns] = require(`./${ns}.json`);
  out[ns].getCryptoId = getCryptoId.bind(out[ns]);
  return out;
}, {});

module.exports = map_for_coverage;
