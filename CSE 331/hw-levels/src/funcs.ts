// Problem 4:

/**
 * 
 * @param x a record with two fields, n and m, both non-negative integers
 * @returns 1 if n = 0, -1 if m = 0, and 0 otherwise
 */
export const r = (x: {n: bigint, m: bigint}): bigint => {
  if (x.n === 0n) {
    return 1n;
  } else if (x.m === 0n) {
    return -1n;
  } else {
    return 0n;
  }
};

/**
 * 
 * @param x a tuple of a non-negative integer and a boolean or a boolean
 * @returns 0 if x is a boolean, n if x is a tuple and b is true, 
 * and s(n+1, true) otherwise
 */
export const s = (x: [bigint, boolean] | boolean): bigint => {
  if (typeof x === "boolean") {
    return 0n;
  } else {
    const[n, b] = x;
    if (b === true) {
      return x[0];
    } else {
      return s([x[0] + 1n, true]);
    }
  }
}

/**
 * 
 * @param x a tuple of a boolean and a record with two fields, n and m, both numbers
 * @returns n*m if a is true, and n - 2*m otherwise
 */
export const t = (x: [boolean,  {n: number, m: number}]): number => {
  const [a, b] = x;
  if (a === true) {
    return b.n * b.m;
  } else {
    return b.n - 2 * b.m;
  }
}



// Problem 7:

/**
 * Returns n!
 * @param n a non-negative integer
 * @returns n x (n-1) x ... x 1 = n! if n > 0, and 1 if n = 0
 */
export const fact = (n: bigint): bigint => {
  if (n === 0n) {
    return 1n;
  } else {
    return fact(n - 1n) * n ;
  }
}