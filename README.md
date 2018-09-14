# crypto-db

This is a database of all cryptocurrencies.
It consists of a file which lists all cryptocurrencies with unique identifiers, together with symbol mapping tables in various namespaces such as cryptocurrency projects and exchanges.

## Goal and difference from related works
The goal of `crypto-db` is to build a comprehensive database of cryptocurrencies and their appearance in namespaces, as well as their evolutions over time.
This will help any cryptocurrency holders to identify a cryptocurrency among various namespaces, and any developers to provide interoperability between cryptocurrency-related projects without ambiguity. 

Finally, although we already see thorough works such as ones by price aggregators today, the `crypto-db` aims to identify cryptocurrencies by their underlying artifacts; typical difference is what we call `Crypto Action`, which keeps track of changes in each cryptocurrency for this purpose. 


## How to contribute

Please make PRs, and join the group of Crypto [Numismatists](https://en.wikipedia.org/wiki/Numismatist_(specialist)).

### How to check consistency before PR
With Python (>=3.6), your changes can be checked if they are consistent in the following way. 

```sh
$ cd src/python
$ pip install pytest
$ pytest
```

## File structure

- `crypto-db.json` - where cryptocurrencies are defined
    - `id` - CryptoID, a unique identifier for each cryptocurrency.
    - `symbol` - widely-used ticker symbol of this cryptocurrency. Unique in this file. Can be changed later. If different cryptocurrencies claim a same symbol in different namespaces, the symbol in this file might be different from those in the namespaces to avoid ambiguity. Also, if the currency saw a branding change while keeping the underlying blockchain or token intact, this symbol might reflect the new brand. 
    - `name` - name of the cryptocurrency. Can be changed later.

- `crypto-actions.json` - records cryptocurrency events related to its brand, blockchain or token. `Crypto Action` is analogous to [Corporate Action](https://en.wikipedia.org/wiki/Corporate_action) in traditional assets.
   - `action_id` - unique identifier of this Crypto Action, starting with "CA" followed by 10 random characters as in CryptoID.
   - `ids` - related CryptoIDs.
   - `type` - currently "Symbol Change", "Token Swap" and "Mainnet Launch" are identified.
   - `description` - description of this Crypto Action.
   - `reported` - (optional) time in ISO8601 when this action was first announced or reported.
   - `executed` - (optional) time in ISO8601 when this action is executed or planned to execute.

- `map-for-<accuracy|coverage>/<namespace>.json` - defines a map between a symbol in a namespace to id. See 'About map-for-accuracy and map-for-coverage' below for detail.
   - `ns_id` - identifier in the namespace.
   - `id` - corresponding CryptoID.
   - `from` - (optional) UTC in ISO8601 specifying when this mapping is enabled. Inclusive.
   - `to` - (optional) UTC in ISO8601 specifying when this mapping is disabled. Exclusive.
   - `ns_[key]` - (varies) additional, arbitrary information about `ns_id`, such as the name of the cryptocurrency in the namespace.

- `composite/<namespace>.json` - define a mapping from one `ns_id` to multiple CryptoIDs when the namespace consider multiple CryptoIDs as one cryptocurrency. This is often used to chart prices continuously before and after crypto-actions.
  - `composite_id` - unique identifier for this composite, starting with "CC" followed by 10 random characters as in CryptoID.
  - `ns_id` - id in the namespace.
  - `ids` - CryptoIDs which compose this composite.

### About CryptoID
CryptoID is used to uniquely identify a cryptocurrency and represents one blockchain or one token contract on a blockchain such as ERC20 Token on Ethereum. The following construction method is designed to make CryptoIDs language-safe in English while enabling concurrent multiple PRs without conflicting each other.

CryptoID consists of twelve characters starting with "C", followed by eleven characters each of which is randomly picked from "TNLDPHGFYWKVXZJQ" without repetition. They are alphabet characters, excluding the five frequently-used characters and all vowels in English, as well as three characters commonly used in cryptocurrency symbols.

CryptoID will be issued for a coin or a token which is (was) listed at least one crypto exchange. 

### About map-for-accuracy and map-for-coverage
Both files define a map from cryptocurrency identifiers in a certain namespace to CryptoIDs.

If your priority is to have an accurate mapping, use `map-for-accuracy`. If your priority is to map as many symbols as possible, use `map-for-coverage`.

`map-for-accuracy` tries to define all identifiers in the namespace. If a namespace comes up with a new symbol, and if the symbol isn't in this map, you can assume the CryptoID of the symbol is not defined yet. Because new currencies would appear and be listed any time, this map tends to follow behind to reflect the latest status.

`map-for-coverage` also defines a map from a namespace's identifier to CryptoID, as difference from symbols defined in `crypto-db.json`. In other words, this can used as a list of the overwritten to `crypto-db`. If a namespace comes up with a new symbol, and if the symbol is not in this coverage map but found in `crypto-db.json` instead, then you might assume the namespace's symbol is the same as the one in `crypto-db.json` and find its CryptoID.

## TODO
Archive contents of sources in `crypto-actions.json` so that they can be reviewed in future even if the original sources cease to exist.