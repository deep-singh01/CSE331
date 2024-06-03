import * as assert from 'assert';
import { NW, NE, SE, SW, GREEN, RED, ROUND, STRAIGHT, Square, 
  Row, rnil, rcons, qnil, qcons } from './quilt';
import { PatternA, PatternB, PatternC, PatternD, PatternE } from './patterns';


describe('patterns', function() {

  // Feel free to use these in your tests (though it's not required)
  // and create any other consts you find useful:
  //
  const nw_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: NW};
  const nw_rnd_red: Square = {shape: ROUND, color: RED, corner: NW};
  const nw_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: NW};
  const nw_strt_red: Square = {shape: STRAIGHT, color: RED, corner: NW};

  const ne_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: NE};
  const ne_rnd_red: Square = {shape: ROUND, color: RED, corner: NE};
  const ne_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: NE};
  const ne_strt_red: Square = {shape: STRAIGHT, color: RED, corner: NE};

  const se_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: SE};
  const se_rnd_red: Square = {shape: ROUND, color: RED, corner: SE};
  const se_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: SE};
  const se_strt_red: Square = {shape: STRAIGHT, color: RED, corner: SE};

  const sw_rnd_grn: Square = {shape: ROUND, color: GREEN, corner: SW};
  const sw_rnd_red: Square = {shape: ROUND, color: RED, corner: SW};
  const sw_strt_grn: Square = {shape: STRAIGHT, color: GREEN, corner: SW};
  const sw_strt_red: Square = {shape: STRAIGHT, color: RED, corner: SW};

  it('PatternA', function() {
    // TODO: Uncomment these example tests and add more tests in problem 1g

    // PatternA Rows
    const gr_rnd_row: Row = rcons(ne_rnd_grn, rcons(ne_rnd_grn, rnil));
    const red_rnd_row: Row = rcons(ne_rnd_red, rcons(ne_rnd_red, rnil));

    // No Mutation - Recursive Testing: 0-1-Many Heuristic
    // n = 0
    assert.deepStrictEqual(PatternA(0n), qnil); // color not specified
    assert.deepStrictEqual(PatternA(0n, RED), qnil); // color specified

    // n = 1
    // color not specified
    assert.deepStrictEqual(PatternA(1n),
      qcons(gr_rnd_row, qnil));
    // color specified
    assert.deepStrictEqual(PatternA(1n, RED),
      qcons(red_rnd_row, qnil));
    
    // n = many (2, 4)
    // 2 - color not specified
    assert.deepStrictEqual(PatternA(2n),
      qcons(gr_rnd_row, qcons(gr_rnd_row, qnil)));
    // 2 - color specified
    assert.deepStrictEqual(PatternA(2n, RED),
      qcons(red_rnd_row, qcons(red_rnd_row, qnil)));
    // 4 - color not specified
    assert.deepStrictEqual(PatternA(4n),
      qcons(gr_rnd_row, qcons(gr_rnd_row, qcons(gr_rnd_row, qcons(gr_rnd_row, qnil)))));
    // 4 - color specified
    assert.deepStrictEqual(PatternA(4n, RED),
      qcons(red_rnd_row, qcons(red_rnd_row, qcons(red_rnd_row, qcons(red_rnd_row, qnil)))));

    // assert.throw() checks that an error occurs when the first argument 
    //    (a function) is called.
    // Error cases: negative rows
    // color not specified
    assert.throws(() => PatternA(-1n), Error);
    // color specified
    assert.throws(() => PatternA(-1n, RED), Error);
  });

  it('PatternB', function() {
    // TODO: Add tests in problem 1g
    
    // PatternB Rows
    const gr_row: Row = rcons(ne_strt_grn, rcons(sw_strt_grn, rnil));
    const red_row: Row = rcons(ne_strt_red, rcons(sw_strt_red, rnil));

    // No Mutation - Recursive Testing: 0-1-Many Heuristic
    // n = 0
    // color not specified
    assert.deepStrictEqual(PatternB(0n), qnil);
    // color specified
    assert.deepStrictEqual(PatternB(0n, RED), qnil);

    // n = 1
    // color not specified
    assert.deepStrictEqual(PatternB(1n),
      qcons(gr_row, qnil));
    // color specified
    assert.deepStrictEqual(PatternB(1n, RED),
      qcons(red_row, qnil));
    
    // n = many (2, 4)
    // 2 - color not specified
    assert.deepStrictEqual(PatternB(2n),
      qcons(gr_row, qcons(gr_row, qnil)));
    // 2 - color specified
    assert.deepStrictEqual(PatternB(2n, RED),
      qcons(red_row, qcons(red_row, qnil)));
    // 4 - color not specified
    assert.deepStrictEqual(PatternB(4n),
      qcons(gr_row, qcons(gr_row, qcons(gr_row, qcons(gr_row, qnil)))));
    // 4 - color specified
    assert.deepStrictEqual(PatternB(4n, RED),
      qcons(red_row, qcons(red_row, qcons(red_row, qcons(red_row, qnil)))));
    
    // Error cases: negative rows
    // color not specified
    assert.throws(() => PatternB(-1n), Error);
    // color specified
    assert.throws(() => PatternB(-1n, RED), Error);
  });

  it('PatternC', function() {
    // TODO: Add tests in problem 1g
  
    // PatternC Rows
    const gr_row_1: Row = rcons(ne_rnd_grn, rcons(nw_rnd_grn, rnil));
    const gr_row_2: Row = rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil));
    const red_row_1: Row = rcons(ne_rnd_red, rcons(nw_rnd_red, rnil));
    const red_row_2: Row = rcons(se_rnd_red, rcons(sw_rnd_red, rnil));

    // No Mutation - Recursive Testing: 0-1-Many Heuristic
    // n = 0
     // color not specified
    assert.deepStrictEqual(PatternC(0n), qnil);
    // color specified
    assert.deepStrictEqual(PatternC(0n, RED), qnil);

    // Error Cases: n = 1
    // color not specified
    assert.throws(() => PatternC(1n), Error);
    // color specified
    assert.throws(() => PatternC(1n, RED), Error);
    
    // n = many (n % 2 == 0) - even (2, 4)
    // 2 - color not specified
    assert.deepStrictEqual(PatternC(2n),
      qcons(gr_row_2, qcons(gr_row_1, qnil)));
    // 2 - color specified
    assert.deepStrictEqual(PatternC(2n, RED),
      qcons(red_row_2, qcons(red_row_1, qnil)));
    // 4 - color not specified
    assert.deepStrictEqual(PatternC(4n),
      qcons(gr_row_2, qcons(gr_row_1, qcons(gr_row_2, qcons(gr_row_1, qnil)))));
    // 4 - color specified
    assert.deepStrictEqual(PatternC(4n, RED),
      qcons(red_row_2, qcons(red_row_1, qcons(red_row_2, qcons(red_row_1, qnil)))));

    // Error Cases: n = many (n % 2 == 1) - odd (3, 5)
    // 3 - color not specified
    assert.throws(() => PatternC(3n), Error);
    // 3 - color specified
    assert.throws(() => PatternC(3n, RED), Error);
    // 5 - color not specified
    assert.throws(() => PatternC(5n), Error);
    // 5 - color specified
    assert.throws(() => PatternC(5n, RED), Error);
    
    // Error cases: negative rows
    // color not specified
    assert.throws(() => PatternC(-1n), Error);
    // color specified
    assert.throws(() => PatternC(-1n, RED), Error);
  });

  it('PatternD', function() {
    // TODO: Add tests in problem 1g

    // PatternD Rows
    const gr_row_1: Row = rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil));
    const gr_row_2: Row = rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil));
    const red_row_1: Row = rcons(sw_rnd_red, rcons(se_rnd_red, rnil));
    const red_row_2: Row = rcons(nw_rnd_red, rcons(ne_rnd_red, rnil));

    // No Mutation - Recursive Testing: 0-1-Many Heuristic
    // n = 0
    // color not specified
    assert.deepStrictEqual(PatternD(0n), qnil);
    // color specified
    assert.deepStrictEqual(PatternD(0n, RED), qnil);

    // Error Cases: n = 1
    // color not specified
    assert.throws(() => PatternD(1n), Error);
    // color specified
    assert.throws(() => PatternD(1n, RED), Error);
    
    // n = many (n % 2 == 0) - even (2, 4)
    // 2 - color not specified
    assert.deepStrictEqual(PatternD(2n),
      qcons(gr_row_2, qcons(gr_row_1, qnil)));
    // 2 - color specified
    assert.deepStrictEqual(PatternD(2n, RED),
      qcons(red_row_2, qcons(red_row_1, qnil)));
    // 4 - color not specified
    assert.deepStrictEqual(PatternD(4n),
      qcons(gr_row_2, qcons(gr_row_1, qcons(gr_row_2, qcons(gr_row_1, qnil)))));
    // 4 - color specified
    assert.deepStrictEqual(PatternD(4n, RED),
      qcons(red_row_2, qcons(red_row_1, qcons(red_row_2, qcons(red_row_1, qnil)))));

    // Error cases: n = many (n % 2 == 1) - odd (3, 5)
    // 3 - color not specified
    assert.throws(() => PatternD(3n), Error);
    // 3 - color specified
    assert.throws(() => PatternD(3n, RED), Error);
    // 5 - color not specified
    assert.throws(() => PatternD(5n), Error);
    // 5 - color specified
    assert.throws(() => PatternD(5n, RED), Error);
    
    // Error cases: negative rows
    // color not specified
    assert.throws(() => PatternD(-1n), Error);
    // color specified
    assert.throws(() => PatternD(-1n, RED), Error);
  });

  it('PatternE', function() {
    // TODO: Add tests in problem 1g

    // PatternE Rows
    const gr_row_1: Row = rcons(ne_strt_grn, rcons(sw_strt_grn, rnil));
    const gr_row_2: Row = rcons(se_strt_grn, rcons(nw_strt_grn, rnil));
    const red_row_1: Row = rcons(ne_strt_red, rcons(sw_strt_red, rnil));
    const red_row_2: Row = rcons(se_strt_red, rcons(nw_strt_red, rnil));

    // No Mutation - Recursive Testing: 0-1-Many Heuristic
    // n = 0
    // color not specified
    assert.deepStrictEqual(PatternE(0n), qnil);
    // color specified
    assert.deepStrictEqual(PatternE(0n, RED), qnil);

    // n = 1
    // color not specified
    assert.deepStrictEqual(PatternE(1n),
      qcons(gr_row_1, qnil));
    // color specified
    assert.deepStrictEqual(PatternE(1n, RED),
      qcons(red_row_1, qnil));
    
    // n = many (n % 2 == 0) - even (2, 4)
    // 2 - color not specified
    assert.deepStrictEqual(PatternE(2n),
      qcons(gr_row_1, qcons(gr_row_2, qnil)));
    // 2 - color specified
    assert.deepStrictEqual(PatternE(2n, RED),
      qcons(red_row_1, qcons(red_row_2, qnil)));
    // 4 - color not specified
    assert.deepStrictEqual(PatternE(4n),
      qcons(gr_row_1, qcons(gr_row_2, qcons(gr_row_1, qcons(gr_row_2, qnil)))));
    // 4 - color specified
    assert.deepStrictEqual(PatternE(4n, RED),
      qcons(red_row_1, qcons(red_row_2, qcons(red_row_1, qcons(red_row_2, qnil)))));

    // n = many (n % 2 == 1) - odd (3, 5)
    // 3 - color not specified
    assert.deepStrictEqual(PatternE(3n),
      qcons(gr_row_1, qcons(gr_row_2, qcons(gr_row_1, qnil))));
    // 3 - color specified
    assert.deepStrictEqual(PatternE(3n, RED),
      qcons(red_row_1, qcons(red_row_2, qcons(red_row_1, qnil))));
    // 5 - color not specified
    assert.deepStrictEqual(PatternE(5n),
      qcons(gr_row_1, qcons(gr_row_2, qcons(gr_row_1, qcons(gr_row_2, qcons(gr_row_1, qnil))))));
    // 5 - color specified
    assert.deepStrictEqual(PatternE(5n, RED),
      qcons(red_row_1, qcons(red_row_2, qcons(red_row_1, qcons(red_row_2, qcons(red_row_1, qnil))))));
    
    // Error cases: negative rows
    // color not specified
    assert.throws(() => PatternE(-1n), Error);
    // color specified
    assert.throws(() => PatternE(-1n, RED), Error);
  });
});
