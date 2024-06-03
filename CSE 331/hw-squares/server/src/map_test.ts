// import * as assert from 'assert';

// TODO (5e): copy over your mutable map tests from HW7
//            add tests for the function that gets all the keys in the map
import * as assert from 'assert';
import { makeSimpleMap } from './map';

// TODO: write test cases for the methods of your map class

describe('map', function() {
  const map = makeSimpleMap();

  it('contains', function() {
    // map is empty
    assert.deepStrictEqual(map.contains("a"), false);
    assert.deepStrictEqual(map.contains("b"), false);
    // map contains key
    map.set("a", 1);
    assert.deepStrictEqual(map.contains("a"), true);
    // map does not contain key
    assert.deepStrictEqual(map.contains("b"), false);
    map.clear();
  });

  it('get', function() {
    // map is empty
    assert.deepStrictEqual(map.get("a"), undefined);
    assert.deepStrictEqual(map.get("b"), undefined);
    // map contains key
    map.set("a", 1);
    assert.deepStrictEqual(map.get("a"), 1);
    // map does not contain key
    assert.deepStrictEqual(map.get("b"), undefined);
    map.clear();
  });

  it('set', function() {
    // map is empty & doesn't contain keys
    assert.deepStrictEqual(map.set("a", 1), false);
    assert.deepStrictEqual(map.set("b", 2), false);
    // map contains keys
    assert.deepStrictEqual(map.set("a", 2), true);
    assert.deepStrictEqual(map.set("b", 3), true);
    // check values
    assert.deepStrictEqual(map.get("a"), 2);
    assert.deepStrictEqual(map.get("b"), 3);
    map.clear();
  });

  it('clear', function() {
    // map is empty
    map.clear();
    assert.deepStrictEqual(map.contains("a"), false);
    assert.deepStrictEqual(map.contains("b"), false);
    // map contains keys
    map.set("a", 1);
    map.set("b", 2);
    map.clear();
    assert.deepStrictEqual(map.contains("a"), false);
    assert.deepStrictEqual(map.contains("b"), false);
  });
});