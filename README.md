# crypto-db

This is a database of all crytocurrencies.
It consists of a file which lists all cryptocurrencies with unique identifiers, together with symbol mapping tables in various cryptocurrency projects and exchanges.

## How to contribute

Please make PRs.

## File structure

- `crypto_ids.json` - where cryptocurrencies are defined
    - `cid` - unique identifier for each cryptocurrency.
    - `symbol` - widely-used ticker symbol of this cryptocurrency. Unique in this file. Can be changed later. If there multiple cryptocurrencies using the same symbol in different exchanges, the symbol in this file might be different from those in the exchanges to avoid ambiguity. Also, if the currency saw a branding change while keeping the underlying blockchain or token intact, this symbol might reflect the new brand. 
    - `name` - name of the cryptocurrency. Can be changed later.
    - `status` - (optional) if it says "INVAILD", this cid should not be used. This doesn't represent the status of the cryptocurrency itself. We leave this to keep the trail.

- `crypto_actions.json` - records cryptocurrency events related to its brand, blockchain or token. Analogical to [Corporate Action] (https://en.wikipedia.org/wiki/Corporate_action) in traditional assets.
   - `cid` - cryptocurrency in issue.
   - `action` - description of the change
   - `reported_time` - UTC in ISO8601 when this action was first announced.
   - `execution_time` -  UTC in ISO8601 when this action is executed or planned to execute.
   - `reflected` - "true" if this action is reflected in crypto_ids.json file; otherwise "false".

- `map_for_<accuracy|coverage>/<project name or exchange name>.json` - defines a map between a symbol in a certain project or exchange (hereafter 'target body') to CID. See 'About map_for_accuracy and map_for_coverage' below.
   - `tid` - identifier in the target body.
   - `cid` - corresponding CID.
   - `valid_from` - (optional) UTC in ISO8601 specifying when this mapping is enabled. Inclusive.
   - `vaild_to` - (optional) UTC in ISO8601 specifying when this mappin is disabled. Exclusive.
   - any key starting with `t_` - additional, arbitrary information about tid, such as a name of this cryptocurrency in the target.

- `composite/<project name or exchange name>.json` - define a mapping from one `tid` to multiple `cid`s when the target body consider multiple CIDs as one cryptocurency. This is often used defined to chart prices continuously before and after crypto-actions.

### About CID
CID (Cryptocurrency ID) is to uniquely identify a cryptocurrency, and represents one blockchain or a token on a blockchain such as ERC20 Token on Ethereum.

CID consists of 9 alphabets starting with "C", followed by 8 alphabets each of which is randomly picked from "TNLDPHGFYWKVXZJQ" without repetition. The letters were chosen to try as much to make CID langauge-safe while enabling simaltaneous, multiple PRs without conflicting each other. They are alphabets excluding the 5 frequently-used letters as well as vowles in English,  and 3 common letters used in cryptocurrency symbols.

### About map_for_accuracy and map_for_coverage
Both files define a map from cryptocurrency identifiers in a certain project or excahnge ('target body') to CIDs.

If your priority is to have an accurate mapping, use `map_for_accuracy`. If your priority is to map as many symbols as possible, use `map_for_coverage`.

`map_for_accuracy` tries to define all identifiers in the target body. If a target body comes up with a new symbol, and if the symbol isn't in this map, you can assume the CID of the symbol is not defined yet.

`map_for_coverage` also defines a map from a target body's identifier to CID, as difference from symbols defined in `crypto_ids.json`. If a target body comes up with a new symbol, and the symbol is not in this coverage map but found in `crypto_ids.json` instead, you can assume the target's symbol is the same as the one in `crypto_ids.json` and obtain its CID.
