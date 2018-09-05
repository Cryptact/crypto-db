# crypto-db

This is a database of all cryptocurrencies.
It consists of a file which lists all cryptocurrencies with unique identifiers, together with symbol mapping tables in various namespaces such as cryptocurrency projects and exchanges.

## How to contribute

Please make PRs, and join the group of Crypto [Numismatians](https://en.wikipedia.org/wiki/Numismatics).

## File structure

- `crypto-db.json` - where cryptocurrencies are defined
    - `id` - CryptoID, an unique identifier for each cryptocurrency.
    - `symbol` - widely-used ticker symbol of this cryptocurrency. Unique in this file. Can be changed later. If there multiple cryptocurrencies using the same symbol in different namespaces, the symbol in this file might be different from those in the nampespaces to avoid ambiguity. Also, if the currency saw a branding change while keeping the underlying blockchain or token intact, this symbol might reflect the new brand. 
    - `name` - name of the cryptocurrency. Can be changed later.


- `crypto-actions.json` - records cryptocurrency events related to its brand, blockchain or token. Crypto Action is analogical to [Corporate Action](https://en.wikipedia.org/wiki/Corporate_action) in traditional assets.
   - `id` - CryptoID in issue.
   - `sequence` - Sequence Number of this Crypto Action of this symbol, starting from 1. A pair of (`id`, `sequence`) can uniquely identify a Crypto Action.
   - `action` - description of the change
   - `reported` - UTC in ISO8601 when this action was first announced or reported.
   - `executed` -  UTC in ISO8601 when this action is executed or planned to execute.

- `map-for-<accuracy|coverage>/<namespace>.json` - defines a map between a symbol in a namespece to id. See 'About map-for-accuracy and map-for-coverage' below for detail.
- 
   - `ns_id` - identifier in the namespace.
   - `id` - corresponding CryptoID.
   - `from` - (optional) UTC in ISO8601 specifying when this mapping is enabled. Inclusive.
   - `to` - (optional) UTC in ISO8601 specifying when this mappin is disabled. Exclusive.
   - any key starting with `ns_` - additional, arbitrary information about `ns_id`, such as a name of this cryptocurrency in the namespace.

- `composite/<namespace>.json` - define a mapping from one `ns_id` to multiple CryptoIDs when the namespace consider multiple CryptoIDs as one cryptocurency. This is often used to chart prices continuously before and after crypto-actions.

### About CryptoID
CryptoID is to uniquely identify a cryptocurrency, and represents one blockchain or a token on a blockchain such as ERC20 Token on Ethereum.

CryptoID consists of 12 alphabets starting with "C", followed by 11 alphabets each of which is randomly picked from "TNLDPHGFYWKVXZJQ" without repetition. The letters were chosen to try as much to make CryptoID langauge-safe while enabling simaltaneous, multiple PRs without conflicting each other. They are alphabets excluding the 5 frequently-used letters as well as vowles in English,  and 3 common letters used in cryptocurrency symbols.

### About map-for-accuracy and map-for-coverage
Both files define a map from cryptocurrency identifiers in a certain namespace to CryptoIDs.

If your priority is to have an accurate mapping, use `map-for-accuracy`. If your priority is to map as many symbols as possible, use `map-for-coverage`.

`map-for-accuracy` tries to define all identifiers in the namespace. If a namespace comes up with a new symbol, and if the symbol isn't in this map, you can assume the CryptoID of the symbol is not defined yet.

`map-for-coverage` also defines a map from a namespace's identifier to CryptoID, as difference from symbols defined in `crypto-db.json`. If a namespace comes up with a new symbol, and if the symbol is not in this coverage map but found in `crypto-db.json` instead, then you can assume the namespace's symbol is the same as the one in `crypto-db.json` and obtain its CID.
