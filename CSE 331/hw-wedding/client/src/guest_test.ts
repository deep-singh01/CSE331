import * as assert from 'assert';
import { Guest, parseGuest, calcGuestsAndFam } from './guest';


describe('guest', function() {

  // TODO: remove the tests for the dummy route

  it('parseGuest', function() {
    // error cases
    // missing name
    assert.deepStrictEqual(parseGuest(""), undefined);
    assert.deepStrictEqual(parseGuest({a: ""}), undefined);
    // missing guestOf
    assert.deepStrictEqual(parseGuest({name: "a"}), undefined);
    assert.deepStrictEqual(parseGuest({name: "b"}), undefined);
    // missing family
    assert.deepStrictEqual(parseGuest({name: "a", guestOf: "Molly"}), undefined);
    assert.deepStrictEqual(parseGuest({name: "b", guestOf: "James"}), undefined);
    // dietRestrictions is defined but not a string
    assert.deepStrictEqual(parseGuest({name: "a", guestOf: "Molly", family: true, dietRestrictions: 12}), undefined);
    assert.deepStrictEqual(parseGuest({name: "b", guestOf: "James", family: false, dietRestrictions: 23}), undefined);
    // hasPlusOne is defined but not a 0 or 1
    const g1 = {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 2};
    const g2 = {name: "a", guestOf: "Molly", family: true, dietRestrictions: "vegan", hasPlusOne: -1};
    assert.deepStrictEqual(parseGuest(g1), undefined);
    assert.deepStrictEqual(parseGuest(g2), undefined);
    // hasPlusOne is 1 but plusOneName is missing
    const g3 = {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1};
    const g4 = {name: "a", guestOf: "Molly", family: true, dietRestrictions: "vegan", hasPlusOne: 1, plusOneName: 12};
    assert.deepStrictEqual(parseGuest(g3), undefined);
    assert.deepStrictEqual(parseGuest(g4), undefined);
    // hasPlusOne is 1 but plusOneDietRest is missing
    const g5 = {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1, plusOneName: "Alice"};
    const g6 = {name: "a", guestOf: "Molly", family: true, dietRestrictions: "vegan", hasPlusOne: 1, plusOneName: "Alice", plusOneDietRest: 12};
    assert.deepStrictEqual(parseGuest(g5), undefined);
    assert.deepStrictEqual(parseGuest(g6), undefined);

    // success cases
    // no diet restrictions - guest has been added but details have not been filled out
    const g7 = {name: "a", guestOf: "Molly", family: true};
    const g8 = {name: "b", guestOf: "James", family: false};
    assert.deepStrictEqual(parseGuest(g7), {name: "a", guestOf: "Molly", family: true});
    assert.deepStrictEqual(parseGuest(g8), {name: "b", guestOf: "James", family: false});
    // diet restrictions - guest has been added, details have been filled out, and guest plus one is unknown
    const g9 = {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none"};
    const g10 = {name: "b", guestOf: "James", family: false, dietRestrictions: "vegan"};
    assert.deepStrictEqual(parseGuest(g9), {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none"});
    assert.deepStrictEqual(parseGuest(g10), {name: "b", guestOf: "James", family: false, dietRestrictions: "vegan"});
    // diet restrictions - guest has been added, details have been filled out, and guest has no plus one
    const g11 = {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 0};
    const g12 = {name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: 0};
    assert.deepStrictEqual(parseGuest(g11), {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 0});
    assert.deepStrictEqual(parseGuest(g12), {name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: 0});
    // diet restrictions - guest has been added, details have been filled out, and guest has a plus one
    const g13 = {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1, plusOneName: "Alice", plusOneDietRest: "none"};
    const g14 = {name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: 1, plusOneName: "Bob", plusOneDietRest: "vegan"};
    assert.deepStrictEqual(parseGuest(g13), {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1, plusOneName: "Alice", plusOneDietRest: "none"});
    assert.deepStrictEqual(parseGuest(g14), {name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: 1, plusOneName: "Bob", plusOneDietRest: "vegan"});
  });

  it('calcGuestsAndFam', function() {
    // empty array
    const emptyArr: Guest[] = [];
    assert.deepStrictEqual(calcGuestsAndFam("Molly", emptyArr), {min: 0, max: 0, family: 0});
    assert.deepStrictEqual(calcGuestsAndFam("James", emptyArr), {min: 0, max: 0, family: 0});
    // array with one guest - unknown plus one
    const g1: Guest = {name: "a", guestOf: "Molly", family: true};
    const oneGuestArr: Guest[] = [g1];
    assert.deepStrictEqual(calcGuestsAndFam("Molly", oneGuestArr), {min: 1, max: 2, family: 1});
    assert.deepStrictEqual(calcGuestsAndFam("James", oneGuestArr), {min: 0, max: 0, family: 0});
    // array with one guest - no plus one
    const g2: Guest = {name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: 0};
    const oneGuestArr2: Guest[] = [g2];
    assert.deepStrictEqual(calcGuestsAndFam("Molly", oneGuestArr2), {min: 0, max: 0, family: 0});
    assert.deepStrictEqual(calcGuestsAndFam("James", oneGuestArr2), {min: 1, max: 1, family: 0});
    // array with one guest - plus one
    const g3: Guest = {name: "c", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1, plusOneName: "Alice", plusOneDietRest: "none"};
    const oneGuestArr3: Guest[] = [g3];
    assert.deepStrictEqual(calcGuestsAndFam("Molly", oneGuestArr3), {min: 2, max: 2, family: 1});
    assert.deepStrictEqual(calcGuestsAndFam("James", oneGuestArr3), {min: 0, max: 0, family: 0});
    // array multiple guests - mixed plus ones
    const multiGuestArr: Guest[] = [g1, g2, g3];
    assert.deepStrictEqual(calcGuestsAndFam("Molly", multiGuestArr), {min: 3, max: 4, family: 2});
    assert.deepStrictEqual(calcGuestsAndFam("James", multiGuestArr), {min: 1, max: 1, family: 0});
  });
});
