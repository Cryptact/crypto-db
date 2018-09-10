import random

VALID_CHARS = "TNLDPHGFYWKVXZJQ"
CID_LENGTH_WITHOUT_PREFIX = 11

def cidgen():
    cid = "C"
    i = CID_LENGTH_WITHOUT_PREFIX
    available_chars = VALID_CHARS
    while i>0:
        r = random.randrange(0, len(available_chars))
        cid = cid + available_chars[r]
        available_chars = available_chars.replace( available_chars[r], "")
        i = i -1

    return cid

def check(cid, prefix='C'):
    assert len(cid) == CID_LENGTH_WITHOUT_PREFIX +1
    assert cid.startswith(prefix)

    s = dict()
    for c in cid[(len(prefix)):] :
        assert s.get(c,0) == 0
        s[c] = 1
        assert VALID_CHARS.find(c) != -1

def check_composite(cid):
    check(cid, 'CC')

def check_cryptoaction(cid):
    check(cid, 'CA')


if __name__ == "__main__":
    cid = cidgen()
    print(cid)
    check(cid)

    
