import * as assert from 'assert';
import { solid, split, toJson, fromJson, get, newSquare } from './square';
import { cons, nil } from './list';


describe('square', function() {

  it('toJson', function() {
    assert.deepStrictEqual(toJson(solid("white")), "white");
    assert.deepStrictEqual(toJson(solid("green")), "green");

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepStrictEqual(toJson(s1),
      ["blue", "orange", "purple", "white"]);

    const s2 = split(s1, solid("green"), s1, solid("red"));
    assert.deepStrictEqual(toJson(s2),
      [["blue", "orange", "purple", "white"], "green",
       ["blue", "orange", "purple", "white"], "red"]);

    const s3 = split(solid("green"), s1, solid("yellow"), s1);
    assert.deepStrictEqual(toJson(s3),
      ["green", ["blue", "orange", "purple", "white"],
       "yellow", ["blue", "orange", "purple", "white"]]);
  });

  it('fromJson', function() {
    assert.deepStrictEqual(fromJson("white"), solid("white"));
    assert.deepStrictEqual(fromJson("green"), solid("green"));

    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepStrictEqual(fromJson(["blue", "orange", "purple", "white"]), s1);

    assert.deepStrictEqual(
        fromJson([["blue", "orange", "purple", "white"], "green",
                 ["blue", "orange", "purple", "white"], "red"]),
        split(s1, solid("green"), s1, solid("red")));

    assert.deepStrictEqual(
        fromJson(["green", ["blue", "orange", "purple", "white"],
                  "yellow", ["blue", "orange", "purple", "white"]]),
        split(solid("green"), s1, solid("yellow"), s1));
  });

  it('get', function() {
    // error cases: path is not empty and square is solid
    assert.throws(() => get(cons("NE", nil), solid("white")), Error);
    assert.throws(() => get(cons("NW", nil), solid("white")), Error);

    // path is empty
    assert.deepStrictEqual(get(nil, solid("white")), solid("white"));
    assert.deepStrictEqual(get(nil, solid("green")), solid("green"));

    // path is not empty
    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepStrictEqual(get(cons("NW", nil), s1), solid("blue"));
    assert.deepStrictEqual(get(cons("SW", nil), s1), solid("purple"));

    const s2 = split(s1, solid("green"), s1, solid("red"));
    assert.deepStrictEqual(get(cons("NW", cons("NW", nil)), s2), solid("blue"));
    assert.deepStrictEqual(get(cons("SW", cons("NE", nil)), s2), solid("orange"));
  });

  it('newSquare', function() {
    // error cases: path is not empty and square is solid
    assert.throws(() => newSquare(cons("NE", nil), solid("white"), solid("green")), Error);
    assert.throws(() => newSquare(cons("NW", nil), solid("blue"), solid("green")), Error);

    // path is empty
    assert.deepStrictEqual(newSquare(nil, solid("white"), solid("green")), solid("green"));
    assert.deepStrictEqual(newSquare(nil, solid("green"), solid("blue")), solid("blue"));

    // path is not empty and square is split
    const s1 = split(solid("blue"), solid("orange"), solid("purple"), solid("white"));
    assert.deepStrictEqual(newSquare(cons("NW", nil), s1, solid("yellow")), 
      split(solid("yellow"), solid("orange"), solid("purple"), solid("white")));
    assert.deepStrictEqual(newSquare(cons("SW", nil), s1, solid("yellow")), 
      split(solid("blue"), solid("orange"), solid("yellow"), solid("white")));
    
    const s2 = split(s1, solid("green"), s1, solid("red"));
    assert.deepStrictEqual(newSquare(cons("NW", nil), s2, solid("yellow")), 
      split(solid("yellow"), solid("green"), s1, solid("red")));
      assert.deepStrictEqual(newSquare(cons("SW",cons ("SE", nil)), s2, solid("yellow")), 
      split(s1, solid("green"), split(solid("blue"), solid("orange"), solid("purple"), solid("yellow")), solid("red")));
  });

});
