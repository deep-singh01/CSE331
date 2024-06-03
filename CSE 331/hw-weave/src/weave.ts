import { List, nil, equal ,cons, rev, len } from './list';
import { Color } from './color';


/**
 * Returns the list of colors shown in the each of the odd rows (first,
 * third, fifth, etc.) by a warp-faced weave with the given warp colors.
 * @param list of all the (warp) colors in the weave
 * @return keep(colors), i.e., every other color starting from the first
 */
export const warpFacedOdds = (colors: List<Color>): List<Color> => {
  // TODO(5c): detect and handle odd length lists here
  if (colors.kind !== "nil" && (len(colors) % 2n) === 1n) {
    const body = warpFacedEvens(colors.tl);
    return cons(colors.hd, body);
  }

  let R: List<Color> = rev(colors);
  let S: List<Color> = nil;
  let T: List<Color> = nil;

  // Inv: TODO(5a): L = concat(rev(R), S) and T = warpFaceOdds(S)
  while (R.kind !== "nil" && R.tl.kind !== "nil") {
    // TODO(5b): implement this
    T = cons(R.tl.hd, T);
    S = cons(R.tl.hd, cons(R.hd, S));
    R = R.tl.tl;
  }

  if (!equal(S, colors)) {  // defensive programming
    throw new Error("uh oh! S != colors... we made a mistake somewhere!");
  }

  if (R.kind === "nil") {
    return T;  // We have S = colors, so T = keep(S) = keep(colors).
  } else {
    throw new Error("uh oh! the list length wasn't even");
  }
};

/**
 * Returns the list of colors shown in the each of the even rows (second,
 * fourth, etc.) by a warp-faced weave with the given warp colors.
 * @param list of all the (warp) colors in the weave
 * @return drop(colors), i.e., every other color starting from the second
 */
export const warpFacedEvens = (colors: List<Color>): List<Color> => {
  // TODO(5c): detect and handle odd length lists here
  if (colors.kind !== "nil" && (len(colors) % 2n) === 1n) {
    const body = warpFacedOdds(colors.tl);
    return body;
  }
  let R: List<Color> = rev(colors);
  let S: List<Color> = nil;
  let T: List<Color> = nil;

  // Inv: TODO(5a): L = concat(rev(R), S) and T = warpFaceEvens(S)
  while (R.kind !== "nil" && R.tl.kind !== "nil") {
    // TODO(5b): implement this
    T = cons(R.hd, T);
    S = cons(R.tl.hd, cons(R.hd, S));
    R = R.tl.tl;
  }

  if (!equal(S, colors)) {  // defensive programming
    throw new Error("uh oh! S != colors... we made a mistake somewhere!");
  }

  if (R.kind === "nil") {
    return T;  // We have S = colors, so T = drop(S) = drop(colors).
  } else {
    throw new Error("uh oh! the list length wasn't even");
  }
};


/**
 * Returns the given number of rows of a weave with the given colors
 * @param rows the (natural) number of rows in the weave
 * @param colors the weft colors in each row
 * @returns list of the given length where the odd values are the colors of
 *      warpFacedOdds and the even values are the colors of
 *      warpFacedEvens.
 * @returns the function defined recursively (on rows) by
 *   - weave(0, colors) = nil
 *   - weave(1, colors) = cons(warpFacedEvens(colors), nil)
 *   - weave(n+2, colors) =
 *         cons(warpFacedEvens(colors),
 *             cons(warpFacedOdds(colors), weave(n, colors)))
 */
export const weave =
    (_rows: bigint, colors: List<Color>): List<List<Color>> => {
  // TODO: implement this with a while loop as described in 5d
  // Be sure to document your loop invariant with an Inv comment above the loop

  // Base Case
  // _rows is even
  let i: bigint = 0n;
  let S: List<List<Color>> = nil;

  // _rows is odd
  if (_rows % 2n === 1n) {
    i = 1n;
    S = cons(warpFacedEvens(colors), nil);
  }

  // Recursive Case
  // Inv: S = weave(i, colors)
  while (i !== _rows) {
    S = cons(warpFacedEvens(colors),
        cons(warpFacedOdds(colors), S));
    i += 2n;
  }

  return S;
};
