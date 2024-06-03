import * as assert from 'assert';
import { nil } from './list';
import { explode, compact } from './char_list';
import { last, prefix, suffix } from './list_ops';


describe('list_ops', function() {

  it('last', function() {
    // Error case branch
    assert.throws(() => last(nil), Error);

    // 0-1-many: base case
    assert.deepEqual(last(explode("a")), "a".charCodeAt(0));
    assert.deepEqual(last(explode("_")), "_".charCodeAt(0));

    // 0-1-many: one recursive call
    assert.deepEqual(last(explode("hm")), "m".charCodeAt(0));
    assert.deepEqual(last(explode("hu")), "u".charCodeAt(0));

    // 0-1-many: many recursive calls
    assert.deepEqual(last(explode("hub")), "b".charCodeAt(0));
    assert.deepEqual(last(explode("stray")), "y".charCodeAt(0));
    assert.deepEqual(last(explode("shrug")), "g".charCodeAt(0));
  });

  it('prefix', function() {
    // Error case branch
    assert.throws(() => prefix(-2n, nil), Error);
    assert.throws(() => prefix(-5n, nil), Error);

    // Error case branch
    assert.throws(() => prefix(2n, nil), Error);
    assert.throws(() => prefix(5n, nil), Error);

    // 0-1-many: base case
    assert.deepStrictEqual(compact(prefix(0n, explode(""))), "");
    assert.deepStrictEqual(compact(prefix(0n, explode("abc"))), "");

    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(compact(prefix(1n, explode("abc"))), "a");
    assert.deepStrictEqual(compact(prefix(1n, explode("uvwxyz"))), "u");

    // 0-1-many: 2+ recursive calls
    assert.deepStrictEqual(compact(prefix(2n, explode("abc"))), "ab");
    assert.deepStrictEqual(compact(prefix(3n, explode("uvwxyz"))), "uvw");
  });

  it('suffix', function() {
    // Error case branch - negative numbers
    assert.throws(() => suffix(-2n, nil), Error);
    assert.throws(() => suffix(-5n, nil), Error);

    // Error case branch - list too short
    assert.throws(() => suffix(2n, nil), Error);
    assert.throws(() => suffix(5n, nil), Error);

    // 0-1-many: base case
    assert.deepStrictEqual(compact(suffix(0n, explode(""))), "");
    assert.deepStrictEqual(compact(suffix(0n, explode("abc"))), "abc");

    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(compact(suffix(1n, explode("abc"))), "bc");
    assert.deepStrictEqual(compact(suffix(1n, explode("uvwxyz"))), "vwxyz");

    // 0-1-many: 2+ recursive calls
    assert.deepStrictEqual(compact(suffix(2n, explode("abc"))), "c");
    assert.deepStrictEqual(compact(suffix(3n, explode("uvwxyz"))), "xyz");
  });

});
