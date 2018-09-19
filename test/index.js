const assert = require("assert");
const { describe, it } = require("mocha");

const cryptoDb = require("..");

describe("cryptoDb", function () {
  it("Has 6 keys", function () {
    assert.ok(cryptoDb.ids);
    assert.ok(cryptoDb.composite);
    assert.ok(cryptoDb.crypto_actions);
    assert.ok(cryptoDb.map_for_accuracy);
    assert.ok(cryptoDb.map_for_coverage);
    assert.ok(cryptoDb.symbols);
    assert.strictEqual(Object.keys(cryptoDb).length, 6);
  });

  describe("ids", function () {

  });

  describe("composite", function () {

  });

  describe("crypto_actions", function () {

  });

  describe("map_for_accuracy", function () {
    it("getCryptoId from binance for TRX on 2018-09-19", function () {
      const ts = new Date("2018-09-19T12:00:00Z").toISOString();
      assert.strictEqual(cryptoDb.map_for_accuracy.binance.getCryptoId("TRX", ts), "CDVYLJGFXHZK");
    });
    it("getCryptoId from binance for ICN on 2018-09-11", function () {
      const ts = new Date("2018-09-11T12:00:00Z").toISOString();
      assert.strictEqual(cryptoDb.map_for_accuracy.binance.getCryptoId("ICN", ts), "CTKLWYQPDFGZ");
    });
    it("getCryptoId from binance for ZAIF on 2018-09-20", function () {
      const ts = new Date("2018-09-20T12:00:00Z").toISOString();
      assert.strictEqual(cryptoDb.map_for_accuracy.binance.getCryptoId("ZAIF", ts), undefined);
    });
    it("getCryptoId from zaif for ZAIF on 2018-09-20", function () {
      const ts = new Date("2018-09-20T12:00:00Z").toISOString();
      assert.strictEqual(cryptoDb.map_for_accuracy.zaif.getCryptoId("ZAIF", ts), "CLYTWVGDXKQP");
    });
  });

  describe("map_for_coverage", function () {
    it("getCryptoId from binance for TRX on 2018-09-19", function () {
      const ts = new Date("2018-09-19T12:00:00Z").toISOString();
      assert.strictEqual(cryptoDb.map_for_coverage.binance.getCryptoId("TRX", ts), "CDVYLJGFXHZK");
    });
    it("getCryptoId from binance for ICN on 2018-09-11", function () {
      const ts = new Date("2018-09-11T12:00:00Z").toISOString();
      assert.strictEqual(cryptoDb.map_for_coverage.binance.getCryptoId("ICN", ts), "CTKLWYQPDFGZ");
    });
  });

  describe("symnbols", function () {

  });
});
