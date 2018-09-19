/**
*** map_for_accuracy
***
*** Copyright (C) 2018 Cryptact, LTD.
**/

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
  "lbank",
  "liquid",
  "mercatox",
  "novaexchange",
  "poloniex",
  "stocksexchange",
  "yobit",
  "zaif"
];

function getCryptoId(ns_id, ts) {
  const hits = this.map.filter((pair) => {
    return pair.ns_id === ns_id && (!pair.from || pair.from <= ts) && (!pair.to || pair.to > ts);
  });
  return (hits.length && hits[0].id) || undefined;
}

const map_for_accuracy = namespaces.reduce(function (out, ns) {
  out[ns] = require(`./${ns}.json`);
  out[ns].getCryptoId = getCryptoId.bind(out[ns]);
  return out;
}, {});

module.exports = map_for_accuracy;
