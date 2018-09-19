# -*- coding: utf-8 -*-
""" Test of crypto-db. Run 'pytest -sv'.
Copyright(C) 2018 Cryptact,LTD.
"""

import json
import os
import glob
import cidgen

DATABASE_ROOT = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../../lib')

crypto_db = {}


def setup_module(module):
    crypto_db['map_for_accuracy'] = {}
    crypto_db['map_for_coverage'] = {}
    crypto_db['composite'] = {}

    with open(os.path.join(DATABASE_ROOT, 'ids.json')) as f:
        crypto_db['ids'] = json.load(f)

    with open(os.path.join(DATABASE_ROOT, 'crypto_actions.json')) as f:
        crypto_db['crypto_actions'] = json.load(f)

    crypto_db['map_for_accuracy'] = load_sub_dirs('map_for_accuracy')
    crypto_db['map_for_coverage'] = load_sub_dirs('map_for_coverage')
    crypto_db['composite'] = load_sub_dirs('composite')


def load_sub_dirs(key)->{}:
    result = {}
    entries = glob.glob(os.path.join(DATABASE_ROOT, key, '*.json'))
    for entry in entries:
        with open(entry) as f:
            namespace = (entry.split("/"))[-1].replace(".json", "")
            result[namespace] = json.load(f)

    return result


def test_no_duplicated_crypto_id():
    def parse_object_pairs(pairs):
        keys = dict()
        for key, _  in pairs:
            assert keys.get(
                key, 0) == 0, f"duplicated CryptoID {key} was found."
            keys[key] = 1

    with open(os.path.join(DATABASE_ROOT, 'ids.json')) as f:
        json.load(f, object_pairs_hook=parse_object_pairs)

    with open(os.path.join(DATABASE_ROOT, 'crypto_actions.json')) as f:
        json.load(f, object_pairs_hook=parse_object_pairs)

    with open(os.path.join(DATABASE_ROOT, 'composite', 'cryptact.json')) as f:
        json.load(f, object_pairs_hook=parse_object_pairs)


def test_crypto_db():
    # test each id is following convention
    # test symbol is unique

    symbols = dict()
    for crypto_id in crypto_db['ids'].keys():
        # print(f"test_crypto_db: checking..{crypto_id}")
        cidgen.check(crypto_id)
        entry = crypto_db['ids'][crypto_id]
        cidgen.check(entry['id'])
        assert symbols.get(
            entry['symbol'], 0) == 0, f"found duplicated symbol {entry['symbol']}."
        symbols[entry['symbol']] = 1


def test_crypto_actions():
    # test each action_id is following convention
    # test ids in action exist.
    symbols = dict()

    for action_id in crypto_db['crypto_actions'].keys():
        # print(f"test_crypto_actions: checking..{action_id}")
        cidgen.check_cryptoaction(action_id)
        entry = crypto_db['crypto_actions'][action_id]
        cidgen.check_cryptoaction(entry['action_id'])
        ids = entry['ids']
        for id in ids:
            assert crypto_db['ids'][id]


def test_map_for_accuracy():
    # check if id exists.
    # log if ns_id is different from symbol in ids

    for namespace in crypto_db['map_for_accuracy'].keys():
        print(f"map_for_accuracy: checking..{namespace}")
        assert namespace == crypto_db['map_for_accuracy'][namespace]['namespace']

        map = crypto_db['map_for_accuracy'][namespace]['map']
        if namespace in crypto_db['map_for_coverage']:
            map_forc = crypto_db['map_for_coverage'][namespace]['map']

        for entry in map:
            db_entry = crypto_db['ids'][entry['id']]
            if db_entry['symbol'] != entry['ns_id']:
                if namespace != 'coinmarketcap':
                    print(
                        f"  overwrite: ns_id {entry['ns_id']} ==> {db_entry['symbol']} ({db_entry['name']})")

                exists_in_map_for_coverage = False
                for each_map_forc in map_forc:
                    if entry['ns_id'] == each_map_forc['ns_id'] and entry['id'] == each_map_forc['id']:
                        exists_in_map_for_coverage = True

                assert exists_in_map_for_coverage, f"{namespace}: ns_id {entry['ns_id']} doesn't exist in map_for_coverage"


def test_map_for_coverage():
    # check if id exists.
    # log if ns_id is different from symbol in ids
    # check each entry exists in map_for_accuracy of the same namespace.
    for namespace in crypto_db['map_for_coverage'].keys():
        print(f"map_for_coverage: checking..{namespace}")
        assert namespace == crypto_db['map_for_coverage'][namespace]['namespace']

        map = crypto_db['map_for_coverage'][namespace]['map']
        map_fora = crypto_db['map_for_accuracy'][namespace]['map']

        for entry in map:
            db_entry = crypto_db['ids'][entry['id']]
            if db_entry['symbol'] != entry['ns_id'] and namespace != 'coinmarketcap':
                print(
                    f"  overwrite: ns_id {entry['ns_id']} ==> {db_entry['symbol']}  ({db_entry['name']})")

            exists_in_map_for_accuracy = False
            for each_map_fora in map_fora:
                if entry['ns_id'] == each_map_fora['ns_id'] and entry['id'] == each_map_fora['id']:
                    exists_in_map_for_accuracy = True

            assert exists_in_map_for_accuracy, f"{namespace}: ns_id {entry['ns_id']} doesn't exist in map_for_accuracy"


def test_composite():
    for namespace in crypto_db['composite'].keys():
        print(f"composite: checking..{namespace}")
        assert namespace == crypto_db['composite'][namespace]['namespace']
        map = crypto_db['composite'][namespace]['map']
        for composite_id in map.keys():
            cidgen.check_composite(composite_id)
            cidgen.check_composite(map[composite_id]['composite_id'])

            ids = map[composite_id]['ids']
            for id in ids:
                assert crypto_db['ids'][id]

def test_cidgen():
    cidgen.check(cidgen.cidgen())
    cidgen.check_composite("CCQZNXFTDWPV")
    cidgen.check_cryptoaction("CAQZNXFTDWPV")
