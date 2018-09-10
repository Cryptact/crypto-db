import json
import os
import glob
import cidgen

DATABASE_ROOT = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../../crypto-db')


def test_ids():
    all_data = load_all_json()
    test_crypto_db(all_data)
    test_crypto_actions(all_data)
    test_map_for_accuracy(all_data)
    test_map_for_coverage(all_data)
    test_composite(all_data)
    pass


def load_all_json()->{}:
    all_data = {}
    all_data['map_for_accuracy'] = {}
    all_data['map_for_coverage'] = {}
    all_data['composite'] = {}

    with open(os.path.join(DATABASE_ROOT, 'crypto-db.json')) as f:
        all_data['crypto-db'] = json.load(f)

    with open(os.path.join(DATABASE_ROOT, 'crypto-actions.json')) as f:
        all_data['crypto-actions'] = json.load(f)

    all_data['map_for_accuracy'] = load_sub_dirs('map_for_accuracy')
    all_data['map_for_coverage'] = load_sub_dirs('map_for_coverage')
    all_data['composite'] = load_sub_dirs('composite')

    return all_data


def load_sub_dirs(key)->{}:
    result = {}
    entries = glob.glob(os.path.join(DATABASE_ROOT, key, '*.json'))
    for entry in entries:
        with open(entry) as f:
            namespace = (entry.split("/"))[-1].replace(".json", "")
            result[namespace] = json.load(f)

    return result


def test_crypto_db(all_data: {}):
    # test each id is following convention
    # test symbol is unique

    symbols = dict()
    for crypto_id in all_data['crypto-db'].keys():
        print(f"test_crypto_db: checking..{crypto_id}")
        cidgen.check(crypto_id)
        entry = all_data['crypto-db'][crypto_id]
        cidgen.check(entry['id'])
        assert symbols.get(entry['symbol'], 0) == 0
        symbols[entry['symbol']] = 1


def test_crypto_actions(all_data: {}):
    # test each action_id is following convention
    # test ids in action exist.
    symbols = dict()

    for action_id in all_data['crypto-actions'].keys():
        print(f"test_crypto_actions: checking..{action_id}")
        cidgen.check_cryptoaction(action_id)
        entry = all_data['crypto-actions'][action_id]
        cidgen.check_cryptoaction(entry['action_id'])
        ids = entry['ids']
        for id in ids:
            assert all_data['crypto-db'][id]


def test_map_for_accuracy(all_data: {}):
    # check if id exists.
    # log if ns_id is different from symbol in crypto-db

    for namespace in all_data['map_for_accuracy'].keys():
        print(f"map_for_accuracy: checking..{namespace}")
        assert namespace == all_data['map_for_accuracy'][namespace]['namespace']
        map = all_data['map_for_accuracy'][namespace]['map']
        for entry in map:
            db_entry = all_data['crypto-db'][entry['id']]
            if db_entry['symbol'] != entry['ns_id'] and namespace != 'coinmarketcap':
                print(
                    f"warn: ns_id {entry['ns_id']} != {db_entry['symbol']} ({db_entry['name']})")


def test_map_for_coverage(all_data: {}):
    # check if id exists.
    # log if ns_id is different from symbol in crypto-db
    # check each entry exists in map_for_accuracy of the same namespace.
    for namespace in all_data['map_for_coverage'].keys():
        print(f"map_for_coverage: checking..{namespace}")
        assert namespace == all_data['map_for_coverage'][namespace]['namespace']
        map = all_data['map_for_coverage'][namespace]['map']
        map_fora = all_data['map_for_accuracy'][namespace]['map']
        for entry in map:
            db_entry = all_data['crypto-db'][entry['id']]
            if db_entry['symbol'] != entry['ns_id'] and namespace != 'coinmarketcap':
                print(
                    f"warn: ns_id {entry['ns_id']} != {db_entry['symbol']}  ({db_entry['name']})")

            exists_in_map_for_accuracy = False
            for each_map_fora in map_fora:
                if entry['ns_id'] == each_map_fora['ns_id'] and entry['id'] == each_map_fora['id']:
                    exists_in_map_for_accuracy = True

            assert exists_in_map_for_accuracy


def test_composite(all_data: {}):
    for namespace in all_data['composite'].keys():
        print(f"composite: checking..{namespace}")
        assert namespace == all_data['composite'][namespace]['namespace']
        map = all_data['composite'][namespace]['map']
        for composite_id in map.keys():
            cidgen.check_composite(composite_id)
            cidgen.check_composite(map[composite_id]['composite_id'])

            ids = map[composite_id]['ids']
            for id in ids:
                assert all_data['crypto-db'][id]


if __name__ == "__main__":
    test_ids()
