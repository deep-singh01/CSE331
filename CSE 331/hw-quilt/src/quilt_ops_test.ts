import * as assert from 'assert';
import { NW, NE, SW, SE, GREEN, RED, ROUND, STRAIGHT, Square, rnil, rcons, qnil, qcons } from './quilt';
import { sflip_vert, rflip_vert, qflip_vert, sflip_horz, rflip_horz, qflip_horz, sew, symmetrize } from './quilt_ops';


describe('quilt_ops', function() {

  // Feel free to use these consts in your tests (though it's not required)
  // and create any others you find useful!

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

  const r_nw_rnd_grn = rcons(nw_rnd_grn, rnil);
  const r_nw_strt_red = rcons(nw_strt_red, rnil);
  const r_ne_rnd_grn = rcons(ne_rnd_grn, rnil);
  const r_ne_strt_red = rcons(ne_strt_red, rnil);
  const r_sw_rnd_grn = rcons(sw_rnd_grn, rnil);
  const r_sw_strt_red = rcons(sw_strt_red, rnil);
  const r_se_rnd_grn = rcons(se_rnd_grn, rnil);
  const r_se_strt_red = rcons(se_strt_red, rnil);
  const r_rnd_grn = rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil));
  const r_strt_red = rcons(nw_strt_red, rcons(ne_strt_red, rnil));
  const r_sew_rnd_grn = rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil));
  const r_swe_rnd_grn = rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil));
  const r3_rnd_grn = rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil))));
  const r4_rnd_grn = rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil))));


  it('sflip_vert', function() {
    // TODO: add more sflip_vert tests beyond this random example test

    // small number of inputs: exhaustive testing

    // Color: RED
    // STRT
    // SW -> NW
    assert.deepStrictEqual(sflip_vert(sw_strt_red), nw_strt_red);
    // SE -> NE
    assert.deepStrictEqual(sflip_vert(se_strt_red), ne_strt_red);
    // NW -> SW
    assert.deepStrictEqual(sflip_vert(nw_strt_red), sw_strt_red);
    // NE -> SE
    assert.deepStrictEqual(sflip_vert(ne_strt_red), se_strt_red);
    // RND
    // SW -> NW
    assert.deepStrictEqual(sflip_vert(sw_rnd_red), nw_rnd_red);
    // SE -> NE
    assert.deepStrictEqual(sflip_vert(se_rnd_red), ne_rnd_red);
    // NW -> SW
    assert.deepStrictEqual(sflip_vert(nw_rnd_red), sw_rnd_red);
    // NE -> SE
    assert.deepStrictEqual(sflip_vert(ne_rnd_red), se_rnd_red);

    // Color: GREEN
    // STRT
    // SW -> NW
    assert.deepStrictEqual(sflip_vert(sw_strt_grn), nw_strt_grn);
    // SE -> NE
    assert.deepStrictEqual(sflip_vert(se_strt_grn), ne_strt_grn);
    // NW -> SW
    assert.deepStrictEqual(sflip_vert(nw_strt_grn), sw_strt_grn);
    // NE -> SE
    assert.deepStrictEqual(sflip_vert(ne_strt_grn), se_strt_grn);
    // RND
    // SW -> NW
    assert.deepStrictEqual(sflip_vert(sw_rnd_grn), nw_rnd_grn);
    // SE -> NE
    assert.deepStrictEqual(sflip_vert(se_rnd_grn), ne_rnd_grn);
    // NW -> SW
    assert.deepStrictEqual(sflip_vert(nw_rnd_grn), sw_rnd_grn);
    // NE -> SE
    assert.deepStrictEqual(sflip_vert(ne_rnd_grn), se_rnd_grn);
  });

  it('rflip_vert', function() {
    // TODO: add more rflip_vert tests beyond this random example test

    // Straight from Spec - Recursive Testing: 0-1-Many Heuristic
    // n = 0
    assert.deepStrictEqual(rflip_vert(rnil), rnil);

    // n = 1
    // NW -> NE & RND & GREEN
    assert.deepStrictEqual(rflip_vert(r_nw_rnd_grn), r_sw_rnd_grn);
    // SE -> SW & STRT & RED
    assert.deepStrictEqual(rflip_vert(r_se_strt_red), r_ne_strt_red);

    // n = many (2, 3)
    // n = 2 - STRT & RED
    assert.deepStrictEqual(rflip_vert(r_strt_red), rcons(sw_strt_red, rcons(se_strt_red, rnil)));
    // n = 3 - RND & GREEN
    assert.deepStrictEqual(rflip_vert(r3_rnd_grn), rcons(sw_rnd_grn, 
      rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)))));
  });

  it('qflip_vert', function() {
    // TODO: add more qflip_vert tests beyond this random example 
    
    // Straight from Spec - Recursive Testing: 0-1-Many Heuristic
    // n = 0
    assert.deepStrictEqual(qflip_vert(qnil), qnil);

    // n = 1
    // NW -> NE & STRT & RED
    assert.deepStrictEqual(qflip_vert(qcons(r_nw_strt_red, qnil)),
        qcons(rcons(sw_strt_red, rnil), qnil));
    // SE -> SW & RND & GREEN
    assert.deepStrictEqual(qflip_vert(qcons(r_se_rnd_grn, qnil)),
      qcons(rcons(ne_rnd_grn, rnil), qnil));

    // n = many (2, 3)
    // n = 2 - STRT & RED
    assert.deepStrictEqual(qflip_vert(qcons(r_nw_strt_red, qcons(r_ne_strt_red, qnil))),
      qcons(r_se_strt_red, qcons(r_sw_strt_red, qnil)));
    // n = 3 - RND & GREEN
    assert.deepStrictEqual(qflip_vert(qcons(r_nw_rnd_grn, qcons(r_ne_rnd_grn, qcons(r_sw_rnd_grn, qnil)))),
      qcons(r_nw_rnd_grn, qcons(r_se_rnd_grn, qcons(r_sw_rnd_grn, qnil))));
  });

  it('sflip_horz', function() {
    // TODO: add more sflip_horz tests beyond this random example test

    // small number of inputs: exhaustive testing

    // Color: RED
    // STRT
    // NW -> NE
    assert.deepStrictEqual(sflip_horz(nw_strt_red), ne_strt_red);
    // NE -> NW
    assert.deepStrictEqual(sflip_horz(ne_strt_red), nw_strt_red);
    // SW -> SE
    assert.deepStrictEqual(sflip_horz(sw_strt_red), se_strt_red);
    // SE -> SW
    assert.deepStrictEqual(sflip_horz(se_strt_red), sw_strt_red);
    // RND
    // NW -> NE
    assert.deepStrictEqual(sflip_horz(nw_rnd_red), ne_rnd_red);
    // NE -> NW
    assert.deepStrictEqual(sflip_horz(ne_rnd_red), nw_rnd_red);
    // SW -> SE
    assert.deepStrictEqual(sflip_horz(sw_rnd_red), se_rnd_red);
    // SE -> SW
    assert.deepStrictEqual(sflip_horz(se_rnd_red), sw_rnd_red);

    // Color: GREEN
    // STRT
    // NW -> NE
    assert.deepStrictEqual(sflip_horz(nw_strt_grn), ne_strt_grn);
    // NE -> NW
    assert.deepStrictEqual(sflip_horz(ne_strt_grn), nw_strt_grn);
    // SW -> SE
    assert.deepStrictEqual(sflip_horz(sw_strt_grn), se_strt_grn);
    // SE -> SW
    assert.deepStrictEqual(sflip_horz(se_strt_grn), sw_strt_grn);
    // RND
    // NW -> NE
    assert.deepStrictEqual(sflip_horz(nw_rnd_grn), ne_rnd_grn);
    // NE -> NW
    assert.deepStrictEqual(sflip_horz(ne_rnd_grn), nw_rnd_grn);
    // SW -> SE
    assert.deepStrictEqual(sflip_horz(sw_rnd_grn), se_rnd_grn);
    // SE -> SW
    assert.deepStrictEqual(sflip_horz(se_rnd_grn), sw_rnd_grn);
  });

  it('rflip_horz', function() {
    // TODO: add more rflip_horz tests beyond this random example test

    // Straight from Spec - Recursive Testing: 0-1-Many Heuristic
    // n = 0
    assert.deepStrictEqual(rflip_horz(rnil), rnil);

    // n = 1
    // NW -> NE & STRT & RED
    assert.deepStrictEqual(rflip_horz(r_nw_strt_red), r_ne_strt_red);
    // SE -> SW & RND & GREEN
    assert.deepStrictEqual(rflip_horz(r_se_rnd_grn), r_sw_rnd_grn);
    
    
    // n = many (2, 3)
    // n = 2 - STRT & RED
    assert.deepStrictEqual(rflip_horz(r_strt_red), rcons(nw_strt_red, rcons(ne_strt_red, rnil)));
    // n = 3 - RND & GREEN
    assert.deepStrictEqual(rflip_horz(r3_rnd_grn), rcons(nw_rnd_grn, 
      rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)))));
      
  });

  it('qflip_horz', function() {
    // TODO: add more qflip_horz tests beyond this random example test

    // Straight from Spec - Recursive Testing: 0-1-Many Heuristic
    // n = 0
    assert.deepStrictEqual(qflip_horz(qnil), qnil);

    // n = 1
    // NW -> NE & STRT & RED
    assert.deepStrictEqual(qflip_horz(qcons(r_nw_strt_red, qnil)),
        qcons(r_ne_strt_red, qnil));
    // SE -> SW & RND & GREEN
    assert.deepStrictEqual(qflip_horz(qcons(r_se_rnd_grn, qnil)),
      qcons(r_sw_rnd_grn, qnil));
    
    // n = many (2, 3)
    // n = 2 - STRT & RED
    assert.deepStrictEqual(qflip_horz(qcons(r_ne_strt_red, qcons(r_nw_strt_red, qnil))),
      qcons(r_nw_strt_red, qcons(r_ne_strt_red, qnil)));
    // n = 3 - RND & GREEN
    assert.deepStrictEqual(qflip_horz(qcons(r_sw_rnd_grn, qcons(r_se_rnd_grn, qcons(r_sw_rnd_grn, qnil)))),
      qcons(r_se_rnd_grn, qcons(r_sw_rnd_grn, qcons(r_se_rnd_grn, qnil))));


  });



  it('sew', function() {
    // invalid case: (qnil, !qnil)
    assert.throws(() => sew(qnil, qcons(r_rnd_grn, qnil)), Error);
    assert.throws(() => sew(qnil, qcons(r_rnd_grn, qcons(r_rnd_grn, qnil))), Error);

    // invalid case: (!qnil, qnil)
    assert.throws(() => sew(qcons(r_rnd_grn, qnil), qnil), Error);
    assert.throws(() => sew(qcons(r_rnd_grn, qcons(r_rnd_grn, qnil)), qnil), Error);

    // 0-1-many: base case
    assert.deepStrictEqual(sew(qnil, qnil), qnil);

    // 0-1-many: one recursive call
    assert.deepStrictEqual(sew(qcons(r_rnd_grn, qnil), qcons(r_rnd_grn, qnil)), qcons(r3_rnd_grn, qnil));
    assert.deepStrictEqual(sew(qcons(r_sew_rnd_grn, qnil), qcons(r_sew_rnd_grn, qnil)), qcons(r4_rnd_grn, qnil));

    // 0-1-many: many recursive calls
    assert.deepStrictEqual(
        sew(qcons(r_rnd_grn, qcons(r_rnd_grn, qnil)), qcons(r_rnd_grn, qcons(r_rnd_grn, qnil))),
        qcons(r3_rnd_grn, qcons(r3_rnd_grn, qnil)));
    assert.deepStrictEqual(
        sew(qcons(r_sew_rnd_grn, qcons(r_sew_rnd_grn, qcons(r_sew_rnd_grn, qnil))), 
            qcons(r_sew_rnd_grn, qcons(r_sew_rnd_grn, qcons(r_sew_rnd_grn, qnil)))),
        qcons(r4_rnd_grn, qcons(r4_rnd_grn, qcons(r4_rnd_grn, qnil))));
  });

  it('symmetrize', function() {
    // 0-1-many: base case
    assert.deepStrictEqual(symmetrize(qnil), qnil);
    assert.deepStrictEqual(symmetrize(qcons(rcons(nw_rnd_grn, rnil), qnil)),
        qcons(rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)),
            qcons(rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)), qnil)));

    // 0-1-many: one recursive call
    assert.deepStrictEqual(symmetrize(qcons(rcons(nw_rnd_grn, rnil), qnil)),
        qcons(rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)),
            qcons(rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)), qnil)));
    assert.deepStrictEqual(symmetrize(qcons(rcons(se_rnd_grn, rnil), qnil)),
        qcons(rcons(se_rnd_grn, rcons(sw_rnd_grn, rnil)),
            qcons(rcons(ne_rnd_grn, rcons(nw_rnd_grn, rnil)), qnil)));

    // 0-1-many: many recursive calls
    assert.deepStrictEqual(symmetrize(qcons(r_rnd_grn, qnil)),
        qcons(
            rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)))),
            qcons(
                rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)))),
                qnil)));
    assert.deepStrictEqual(symmetrize(qcons(r_rnd_grn, qcons(r_swe_rnd_grn, qnil))),
        qcons(
            rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)))),
            qcons(
                rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)))),
                qcons(
                    rcons(nw_rnd_grn, rcons(ne_rnd_grn, rcons(nw_rnd_grn, rcons(ne_rnd_grn, rnil)))),
                    qcons(
                        rcons(sw_rnd_grn, rcons(se_rnd_grn, rcons(sw_rnd_grn, rcons(se_rnd_grn, rnil)))),
                        qnil)))));
  });

});
