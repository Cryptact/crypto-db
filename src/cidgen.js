// EARIOTNSLCUDPMHGBFYWKVXZJQ
// remove the first 5 chars
// remove vowels
// remove BCSM which are common cryptos.
//                 0123456789ABCDEF
const VALID_CHARS = "TNLDPHGFYWKVXZJQ";

const CID_LENGTH_WITHOUT_PREFIX = 11

function generateCid() {
  let cid = "C";
  let i = CID_LENGTH_WITHOUT_PREFIX
  let available_chars = VALID_CHARS
  while (i-- > 0) {
    r = Math.floor(Math.random() * available_chars.length)
    cid = cid + available_chars[r]
    available_chars = available_chars.replace(available_chars[r], "")
  }
  return cid
}

function check(cid) {
  console.assert(cid.length == CID_LENGTH_WITHOUT_PREFIX + 1, 'length');
  console.assert(cid[0] == 'C', 'prefix');

  let s = {};
  let i = 1;
  for (i = 1; i < cid.length; i++) {
    const c = cid[i];
    console.assert(!s[c], 'dups');
    s[c] = 1;
    console.assert(VALID_CHARS.indexOf(c) != -1, 'valid chars');
  }
}

//check("C123"); // length mismatch
//check("A12345678"); //doesn't start C
//check("CLJQTNDKK"); //dups
//check("CLJQTNDKB"); //invalid chars

for (let i = 0; i < 10; i++) {
  const cid = generateCid();
  check(cid);
  console.log("CID= " + cid);
}
// console.log("Is Valid = " + check("CBITCOIN"));
