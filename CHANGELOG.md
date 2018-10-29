# crypto-db

## v1.2.2 /2018-10-29
- Add more coins
- Run formatting

## v1.2.1 / 2018-09-21
- Add a crypto-action "LGD" to "MORE".
- Add keywords to package.json.

## v1.2.0 / 2018-09-19
- Add tests using mocha
- Add `.npmignore` to remove scripts and config from published package
- Generate symbol -> id map called `symbols`
- Fix reducer in maps to output all keys
- Rename `crypto-actions` to `crypto_actions`
- Remove unnecessary `package-lock.json`
- Reorder & standardize formatting using `scripts/javascript/sort-ids`:
  - `ids.json`
  - `map_for_accuracy/<namespace>.json`
  - `map_for_coverage/<namespace>.json`
- Add javascript tests to circleci config
- Add getCryptoId to `map_for_accuracy` and `map_for_coverage`

## v1.1.1 / 2018-09-14
- more mappings for binance, bitfinex, bittrex and poloniex

## v1.1.0 / 2018-09-14
- folder name changes

## v1.0.0 / 2018-09-14
- initial commit without npm publish support
