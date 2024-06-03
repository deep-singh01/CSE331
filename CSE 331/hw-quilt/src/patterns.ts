import { GREEN, STRAIGHT, ROUND, Quilt, qnil, qcons,
  NW, NE, SW, SE, Row, rnil, rcons, Color } from './quilt';


/** Returns a quilt in pattern "A". */
export const PatternA = (n: bigint, c?: Color): Quilt => {
  const colorVal: Color = typeof c === 'undefined' ? GREEN : c;
  // Error Case
  if (n < 0n) {
    throw new Error('Cannot have negative rows!');
  }

  // Base Case
  if (n === 0n) {
    return qnil;
  
  // Recursive Case
  } else {
    const row: Row = rcons({shape: ROUND, color: colorVal, corner: NE},
      rcons({shape: ROUND, color: colorVal, corner: NE}, rnil));
    return qcons(row, PatternA(n - 1n, colorVal));
  }
}

/** Returns a quilt in pattern "B". */
export const PatternB = (n: bigint, c?: Color): Quilt => {
  const colorVal: Color = typeof c === 'undefined' ? GREEN : c;
  // Error Case
  if (n < 0n) {
    throw new Error('Cannot have negative rows!');
  }

  // Base Case
  if (n === 0n) {
    return qnil;

  // Recursive Case
  } else {
    const row: Row = rcons({shape: STRAIGHT, color: colorVal, corner: NE}, 
      rcons({shape: STRAIGHT, color: colorVal, corner: SW}, rnil));
    return qcons(row, PatternB(n - 1n, colorVal));
  }
}

/** Returns a quilt in pattern "C". */
export const PatternC = (n: bigint, c?: Color): Quilt => {
  const colorVal: Color = typeof c === 'undefined' ? GREEN : c;
  // Error Case 1
  if (n < 0n) {
    throw new Error('Cannot have negative rows!');
  }

  // Error Case 2: n is odd
  if (n % 2n !== 0n) {
    throw new Error('Cannot have an odd number of rows!');
  }

  // Base Case
  if (n === 0n) {
    return qnil;

  // Recursive Case: n is even
  } else {
    const row1: Row = rcons({shape: ROUND, color: colorVal, corner: SE}, 
      rcons({shape: ROUND, color: colorVal, corner: SW}, rnil));
    const row2: Row = rcons({shape: ROUND, color: colorVal, corner: NE}, 
      rcons({shape: ROUND, color: colorVal, corner: NW}, rnil));
    return qcons(row1, qcons(row2, PatternC(n - 2n, colorVal)));
  }
}

/** Returns a quilt in pattern "D". */
export const PatternD = (n: bigint, c?: Color): Quilt => {
  const colorVal: Color = typeof c === 'undefined' ? GREEN : c;
  // Error Case 1
  if (n < 0n) {
    throw new Error('Cannot have negative rows!');
  }

  // Error Case 2: n is odd
  if (n % 2n !== 0n) {
    throw new Error('Cannot have an odd number of rows!');
  }

  // Base Case
  if (n === 0n) {
    return qnil;

  // Recursive Case: n is even
  } else {
    const row1: Row = rcons({shape: ROUND, color: colorVal, corner: NW}, 
      rcons({shape: ROUND, color: colorVal, corner: NE}, rnil));
    const row2: Row = rcons({shape: ROUND, color: colorVal, corner: SW}, 
      rcons({shape: ROUND, color: colorVal, corner: SE}, rnil));
    return qcons(row1, qcons(row2, PatternD(n - 2n, colorVal)));
  }
}

/** Returns a quilt in pattern "E". */
export const PatternE = (n: bigint, c?: Color): Quilt => {
  const colorVal: Color = typeof c === 'undefined' ? GREEN : c;
  // Error Case
  if (n < 0n) {
    throw new Error('Cannot have negative rows!');
  }

  // Base Case
  if (n === 0n) {
    return qnil;

  // Recursive Cases
  } else {
    const row1: Row = rcons({shape: STRAIGHT, color: colorVal, corner: NE}, 
      rcons({shape: STRAIGHT, color: colorVal, corner: SW}, rnil));
    const row2: Row = rcons({shape: STRAIGHT, color: colorVal, corner: SE}, 
      rcons({shape: STRAIGHT, color: colorVal, corner: NW}, rnil));

    // n is 1
    if (n === 1n) {
      return qcons(row1, qnil);

    // n > 1
    } else {
      return qcons(row1, qcons(row2, PatternE(n - 2n, colorVal)));
    }
  } 
}