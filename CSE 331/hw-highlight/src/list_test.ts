import * as assert from 'assert';
import { nil, cons, len, split, split_at, compact_list, explode_array } from './list';
import { explode } from './char_list';


describe('list', function() {

  it('len', function() {
    // 0-1-many: base case, 0 recursive calls (only 1 possible input)
    assert.deepEqual(len(nil), 0n);

    // 0-1-many: 1 recursive call
    assert.deepEqual(len(cons(1n, nil)), 1n);
    assert.deepEqual(len(cons(2n, nil)), 1n);

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(len(cons(1n, cons(2n, nil))), 2n);
    assert.deepEqual(len(cons(3n, cons(2n, cons(1n, cons(0n, nil))))), 4n);
  });

  it('split', function() {
    // 0-1-many: base case
    assert.deepEqual(split(0n, explode("")), [nil, nil]);
    assert.deepEqual(split(0n, explode("a")), [nil, explode("a")]);

    // 0-1-many: 1 recursive call
    assert.deepEqual(split(1n, explode("a")), [explode("a"), nil]);
    assert.deepEqual(split(1n, explode("as")), [explode("a"), explode("s")]);
    assert.deepEqual(split(1n, explode("stray")), [explode("s"), explode("tray")]);

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(split(2n, explode("as")), [explode("as"), nil]);
    assert.deepEqual(split(2n, explode("stray")), [explode("st"), explode("ray")]);
    assert.deepEqual(split(3n, explode("stray")), [explode("str"), explode("ay")]);
    assert.deepEqual(split(4n, explode("stray")), [explode("stra"), explode("y")]);
    assert.deepEqual(split(5n, explode("stray")), [explode("stray"), explode("")]);
  });
  
  it('split_at', function() {
    // TODO: add tests for problem 5a
    // 0-1-many: base case
    assert.deepStrictEqual(split_at(explode(""), 0), [nil, nil]);
    assert.deepStrictEqual(split_at(explode("a"), "a".charCodeAt(0)), [nil, explode("a")]);
    assert.deepStrictEqual(split_at(explode("b"), "b".charCodeAt(0)), [nil, explode("b")]);

    // 0-1-many: 1 recursive call
    assert.deepEqual(split_at(explode("as"), "s".charCodeAt(0)), [explode("a"), explode("s")]);
    assert.deepEqual(split_at(explode("stray"), "t".charCodeAt(0)), [explode("s"), explode("tray")]);

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(split_at(explode("stray"), "r".charCodeAt(0)), [explode("st"), explode("ray")]);
    assert.deepEqual(split_at(explode("straight"), "i".charCodeAt(0)), [explode("stra"), explode("ight")]);
  });

  it('compact_list', function() {
    // 0-1-many: base case (only 1 possible)
    assert.deepEqual(compact_list(nil), []);

    // 0-1-many: 1 recursive call
    assert.deepEqual(compact_list(cons(1n, nil)), [1n]);
    assert.deepEqual(compact_list(cons(8n, nil)), [8n]);

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(compact_list(cons(1n, cons(2n, nil))), [1n, 2n]);
    assert.deepEqual(compact_list(cons(3n, cons(2n, cons(1n, nil)))), [3n, 2n, 1n]);
  });

  it('explode_array', function() {
    // 0-1-many: base case (only 1 possible)
    assert.deepEqual(explode_array([]), nil);

    // 0-1-many: 1 recursive call
    assert.deepEqual(explode_array([1n]), cons(1n, nil));
    assert.deepEqual(explode_array([8n]), cons(8n, nil));

    // 0-1-many: 2+ recursive calls
    assert.deepEqual(explode_array([1n, 2n]), cons(1n, cons(2n, nil)));
    assert.deepEqual(explode_array([1n, 2n, 3n]), cons(1n, cons(2n, cons(3n, nil))));
  });
});