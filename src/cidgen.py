import random

VALID_CHARS = "TNLDPHGFYWKVXZJQ"
CID_LENGTH_WITHOUT_PREFIX = 8

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

def check(cid):
    assert len(cid) == CID_LENGTH_WITHOUT_PREFIX +1
    assert cid[0] == 'C'

    s = dict()
    for c in cid[1:] :
        assert s.get(c,0) == 0
        s[c] = 1
        assert VALID_CHARS.find(c) != -1

if __name__ == "__main__":
    cid = cidgen()
    print(cid)
    check(cid)
    # check("CABCDEFG")
    # check("CABDEFGH")
    # check("CWQTJZLL")
    
