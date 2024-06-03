import * as assert from 'assert';
import { nil } from './list';
import { explode, compact } from './char_list';
import { next_latin_char, prev_latin_char, count_consonants, 
  cipher_encode, cipher_decode, crazy_caps_encode, crazy_caps_decode, frog_latin_encode, frog_latin_decode} from './latin_ops';


describe('latin_ops', function() {

  // For the following 2 functions, there are a finite number of cases
  // but the number exceeds our reasonable case limit of 20, so just some
  // were selected.
  it('next_latin_char', function() {
    assert.equal(next_latin_char("a".charCodeAt(0)), "i".charCodeAt(0));
    assert.equal(next_latin_char("e".charCodeAt(0)), "y".charCodeAt(0));
    assert.equal(next_latin_char("i".charCodeAt(0)), "u".charCodeAt(0));
    assert.equal(next_latin_char("o".charCodeAt(0)), "a".charCodeAt(0));
    assert.equal(next_latin_char("u".charCodeAt(0)), "o".charCodeAt(0));
    assert.equal(next_latin_char("j".charCodeAt(0)), "d".charCodeAt(0));
    assert.equal(next_latin_char("g".charCodeAt(0)), "j".charCodeAt(0));
    assert.equal(next_latin_char("d".charCodeAt(0)), "b".charCodeAt(0));
    assert.equal(next_latin_char("t".charCodeAt(0)), "p".charCodeAt(0));
    assert.equal(next_latin_char("c".charCodeAt(0)), "z".charCodeAt(0));
    assert.equal(next_latin_char("k".charCodeAt(0)), "c".charCodeAt(0));
    assert.equal(next_latin_char("f".charCodeAt(0)), "w".charCodeAt(0));
    assert.equal(next_latin_char("v".charCodeAt(0)), "f".charCodeAt(0));
    assert.equal(next_latin_char("w".charCodeAt(0)), "v".charCodeAt(0));
    assert.equal(next_latin_char("h".charCodeAt(0)), "r".charCodeAt(0));
    assert.equal(next_latin_char("l".charCodeAt(0)), "h".charCodeAt(0));
    assert.equal(next_latin_char("r".charCodeAt(0)), "l".charCodeAt(0));
    assert.equal(next_latin_char("m".charCodeAt(0)), "n".charCodeAt(0));
    assert.equal(next_latin_char("n".charCodeAt(0)), "m".charCodeAt(0));
    assert.equal(next_latin_char("x".charCodeAt(0)), "q".charCodeAt(0));
  });

  it('prev_latin_char', function() {
    assert.equal(prev_latin_char("a".charCodeAt(0)), "o".charCodeAt(0));
    assert.equal(prev_latin_char("e".charCodeAt(0)), "y".charCodeAt(0));
    assert.equal(prev_latin_char("i".charCodeAt(0)), "a".charCodeAt(0));
    assert.equal(prev_latin_char("u".charCodeAt(0)), "i".charCodeAt(0));
    assert.equal(prev_latin_char("y".charCodeAt(0)), "e".charCodeAt(0));
    assert.equal(prev_latin_char("b".charCodeAt(0)), "d".charCodeAt(0));
    assert.equal(prev_latin_char("p".charCodeAt(0)), "t".charCodeAt(0));
    assert.equal(prev_latin_char("j".charCodeAt(0)), "g".charCodeAt(0));
    assert.equal(prev_latin_char("g".charCodeAt(0)), "p".charCodeAt(0));
    assert.equal(prev_latin_char("k".charCodeAt(0)), "s".charCodeAt(0));
    assert.equal(prev_latin_char("s".charCodeAt(0)), "z".charCodeAt(0));
    assert.equal(prev_latin_char("z".charCodeAt(0)), "c".charCodeAt(0));
    assert.equal(prev_latin_char("f".charCodeAt(0)), "v".charCodeAt(0));
    assert.equal(prev_latin_char("v".charCodeAt(0)), "w".charCodeAt(0));
    assert.equal(prev_latin_char("w".charCodeAt(0)), "f".charCodeAt(0));
    assert.equal(prev_latin_char("l".charCodeAt(0)), "r".charCodeAt(0));
    assert.equal(prev_latin_char("m".charCodeAt(0)), "n".charCodeAt(0));
    assert.equal(prev_latin_char("n".charCodeAt(0)), "m".charCodeAt(0));
    assert.equal(prev_latin_char("q".charCodeAt(0)), "x".charCodeAt(0));
    assert.equal(prev_latin_char("x".charCodeAt(0)), "q".charCodeAt(0));
  });

  it('cipher_encode', function() {
    // 0-1-many: base case, 0 recursive calls (only 1 possible input)
    assert.deepStrictEqual(cipher_encode(explode("")), nil);

    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(compact(cipher_encode(explode("a"))), "i");
    assert.deepStrictEqual(compact(cipher_encode(explode("o"))), "a");

    // 0-1-many: 2+ recursive calls
    assert.deepStrictEqual(compact(cipher_encode(explode("apple"))), "igghy");
    assert.deepStrictEqual(compact(cipher_encode(explode("orange"))), "alimjy");
  });

  it('cipher_decode', function() {
    // 0-1-many: base case, 0 recursive calls (only 1 possible input)
    assert.deepStrictEqual(cipher_decode(explode("")), nil);

    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(compact(cipher_decode(explode("i"))), "a");
    assert.deepStrictEqual(compact(cipher_decode(explode("a"))), "o");

    // 0-1-many: 2+ recursive calls
    assert.deepStrictEqual(compact(cipher_decode(explode("igghy"))), "apple");
    assert.deepStrictEqual(compact(cipher_decode(explode("alimjy"))), "orange");
  });

  it('crazy_caps_encode', function() {
    // 0-1-many: base case, 0 recursive calls
    // length 0
    assert.deepStrictEqual(crazy_caps_encode(nil), nil);

    // length 1
    assert.deepStrictEqual(compact(crazy_caps_encode(explode("i"))), "i");
    assert.deepStrictEqual(compact(crazy_caps_encode(explode("a"))), "a");

    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(compact(crazy_caps_encode(explode("ic"))), "iC");
    assert.deepStrictEqual(compact(crazy_caps_encode(explode("ap"))), "aP");

    // 0-1-many: 2+ recursive calls
    assert.deepStrictEqual(compact(crazy_caps_encode(explode("ice"))), "iCe");
    assert.deepStrictEqual(compact(crazy_caps_encode(explode("helo"))), "hElO");
  });

  it('crazy_caps_decode', function() {
    // 0-1-many: base case, 0 recursive calls (only 1 possible input)
    // length 0
    assert.deepStrictEqual(crazy_caps_decode(nil), nil);

    // length 1
    assert.deepStrictEqual(compact(crazy_caps_decode(explode("i"))), "i");
    assert.deepStrictEqual(compact(crazy_caps_decode(explode("a"))), "a");

    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(compact(crazy_caps_decode(explode("iC"))), "ic");
    assert.deepStrictEqual(compact(crazy_caps_decode(explode("aP"))), "ap");

    // 0-1-many: 2+ recursive calls
    assert.deepStrictEqual(compact(crazy_caps_decode(explode("iCe"))), "ice");
    assert.deepStrictEqual(compact((crazy_caps_decode(explode("aPpS")))), "apps");
  });

  it('count_consonants', function() {
    // base case: nil
    assert.strictEqual(count_consonants(nil), -1n);
    // base case: 1st char is vowel, no recursive calls
    assert.strictEqual(count_consonants(explode("e")), 0n);
    assert.strictEqual(count_consonants(explode("astray")), 0n);
    // base case: no vowels or cosonants
    assert.strictEqual(count_consonants(explode("")), -1n);
    assert.strictEqual(count_consonants(explode("_")), -1n);

    // 1 recursive call:
    assert.strictEqual(count_consonants(explode("say")), 1n);
    assert.strictEqual(count_consonants(explode("l_")), -1n);

    // multiple recursive calls:
    assert.strictEqual(count_consonants(explode("stingray")), 2n);
    assert.strictEqual(count_consonants(explode("stray")), 3n);
    assert.strictEqual(count_consonants(explode("str")), -1n);
    assert.strictEqual(count_consonants(explode("st_a")), -1n);
  });

  // TODO: uncomment the following tests when you are ready to test your
  // Frog Latin functions. You'll need to import these functions.

  // Note: these are just a subset of tests to get you started. We will have
  // additional staff tests, some of which will be hidden. Please add tests/
  // reason through your code carefully to be confident it's correct! Though
  // we will not be grading these things.

  it('frog_latin_encode', function() {
    // Empty Case
    assert.strictEqual(compact(frog_latin_encode(explode(""))), "");

    // cc(L) ==== -1
    assert.strictEqual(compact(frog_latin_encode(explode("cd"))), "cd");
    assert.strictEqual(compact(frog_latin_encode(explode("hfkjd"))), "hfkjd");

    // cc(L) ==== 0
    assert.strictEqual(compact(frog_latin_encode(explode("o"))), "forog");
    assert.strictEqual(compact(frog_latin_encode(explode("elf"))), "felfrog");

    // cc(L) ==== 1
    assert.strictEqual(compact(frog_latin_encode(explode("kevin"))), "evinkrog");
    assert.strictEqual(compact(frog_latin_encode(explode("ten"))), "entrog");
  });

  it('frog_latin_decode', function() {
    // if branch
    assert.strictEqual(compact(frog_latin_decode(explode("forangerog"))), "orange");
    assert.strictEqual(compact(frog_latin_decode(explode("featrog"))), "eat");

    // else if branch
    assert.strictEqual(compact(frog_latin_decode(explode("ameshrog"))), "shame");
    assert.strictEqual(compact(frog_latin_decode(explode("entrog"))), "nte");

    // else branch
    assert.strictEqual(compact(frog_latin_decode(explode("james"))), "james");
    assert.strictEqual(compact(frog_latin_decode(explode(""))), "");
  });

});
