import * as assert from 'assert';
import { explode } from './char_list';
import { cons, explode_array, nil } from './list';
import { parseNextHighlight, parseLines, parseText, parseHighlights } from './parser';


describe('parser', function() {

  it('parseLines', function() {
    assert.deepEqual(parseLines(""), explode_array([]));
    assert.deepEqual(
      parseLines("Red hi there"),
      explode_array([
        {color: 'red', text: 'hi there'},
      ]));
    assert.deepEqual(
      parseLines("Red hi there\nGreen more text"),
      explode_array([
        {color: 'red', text: 'hi there'},
        {color: 'green', text: 'more text'},
      ]));
    assert.deepEqual(
      parseLines("Red hi there\nGreen more text\nBlue really? more?"),
      explode_array([
        {color: 'red', text: 'hi there'},
        {color: 'green', text: 'more text'},
        {color: 'blue', text: 'really? more?'},
      ]));
  });

  it('parseNextHighlight', function() {
    // first branch
    assert.strictEqual(parseNextHighlight(explode("")), undefined);

    // second branch
    assert.strictEqual(parseNextHighlight(explode("ab")), undefined);
    assert.strictEqual(parseNextHighlight(explode("abc")), undefined);

    // third branch
    assert.strictEqual(parseNextHighlight(explode("ab[red")), undefined);
    assert.strictEqual(parseNextHighlight(explode("[red")), undefined);

    // fourth branch
    assert.strictEqual(parseNextHighlight(explode("abc[red|")), undefined);
    assert.strictEqual(parseNextHighlight(explode("abc[red|def")), undefined);

    // fifth branch
    assert.deepStrictEqual(parseNextHighlight(explode("my [red|ball] is great")),
        ["my ", {color: "red", text: "ball"}, explode(" is great")]);
    assert.deepStrictEqual(parseNextHighlight(explode("grass is [green|itchy]")),
        ["grass is ", {color: "green", text: "itchy"}, explode("")]);
  });

  it('parseHighlights', function() {
    // TODO: Add tests here
    // 0-1-many: base case
    assert.deepStrictEqual(parseHighlights(explode("")), nil)
    assert.deepStrictEqual(parseHighlights(explode("abc")), 
      cons({color: "white", text: "abc"}, nil));
    assert.deepStrictEqual(parseHighlights(explode("def")), 
      cons({color: "white", text: "def"}, nil));

    // 0-1-many: 1 recursive call
    assert.deepStrictEqual(parseHighlights(explode("abc [red|def]")), 
      cons({color: "white", text: "abc "}, cons({color: "red", text: "def"}, nil)));
    assert.deepStrictEqual(parseHighlights(explode("[red|def] abc")), 
      cons({color: "red", text: "def"}, cons({color: "white", text: " abc"}, nil)));
    assert.deepStrictEqual(parseHighlights(explode("[red|def]")),
      cons({color: "red", text: "def"}, nil));
    
    // 0-1-many: 2+ recursive calls
    assert.deepStrictEqual(parseHighlights(explode("abc [red|def] ghi [green|jkl]")),
      cons({color: "white", text: "abc "}, cons({color: "red", text: "def"}, 
      cons({color: "white", text: " ghi "}, cons({color: "green", text: "jkl"}, nil)))));
    assert.deepStrictEqual(parseHighlights(explode("[red|def] abc [green|jkl]")),
      cons({color: "red", text: "def"}, cons({color: "white", text: " abc "}, 
      cons({color: "green", text: "jkl"}, nil))));
    assert.deepStrictEqual(parseHighlights(explode("[red|def] [green|jkl]")),
      cons({color: "red", text: "def"}, cons({color: "white", text: " "},
      cons({color: "green", text: "jkl"}, nil))));
  });

  // TODO: Uncomment to test
  it('parseText', function() {
    assert.deepEqual(parseText(""), explode_array([]));
    assert.deepEqual(
      parseText("my [red|favorite] book"),
      explode_array([
        {color: 'white', text: 'my '},
        {color: 'red', text: 'favorite'},
        {color: 'white', text: ' book'},
      ]));
  });
});
