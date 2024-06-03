import { compact, explode } from './char_list';
import { List, cons, concat, len, rev} from './list';
import { prefix, suffix } from './list_ops';

/** Determines whether the given character is a vowel. */
const is_latin_vowel = (c: number): boolean => {
    const ch = String.fromCharCode(c).toLowerCase();
    return "aeiouy".indexOf(ch) >= 0;
};

/** Determines whether the given character is a Latin consonant. */
const is_latin_consonant = (c: number): boolean => {
    const ch = String.fromCharCode(c).toLowerCase();
    return "bcdfghjklmnpqrstvwxz".indexOf(ch) >= 0;
};

/** Changes most Latin alphabetic characters to different ones. */
export const next_latin_char = (c: number): number => {
    switch (String.fromCharCode(c)) {
        case "a": return "i".charCodeAt(0);
        case "e": return "y".charCodeAt(0);
        case "i": return "u".charCodeAt(0);
        case "o": return "a".charCodeAt(0);
        case "u": return "o".charCodeAt(0);
        case "y": return "e".charCodeAt(0);

        case "b": return "t".charCodeAt(0);
        case "p": return "g".charCodeAt(0); 
        case "j": return "d".charCodeAt(0); 
        case "g": return "j".charCodeAt(0); 
        case "d": return "b".charCodeAt(0); 
        case "t": return "p".charCodeAt(0); 

        case "c": return "z".charCodeAt(0);
        case "k": return "c".charCodeAt(0);
        case "s": return "k".charCodeAt(0);
        case "z": return "s".charCodeAt(0);

        case "f": return "w".charCodeAt(0);
        case "v": return "f".charCodeAt(0);
        case "w": return "v".charCodeAt(0);

        case "h": return "r".charCodeAt(0);
        case "l": return "h".charCodeAt(0);
        case "r": return "l".charCodeAt(0);

        case "m": return "n".charCodeAt(0);
        case "n": return "m".charCodeAt(0);

        case "q": return "x".charCodeAt(0);
        case "x": return "q".charCodeAt(0);

        default: return c;
    }
};

/** Inverse of next_char. */
export const prev_latin_char = (c: number): number => {
    switch (String.fromCharCode(c)) {
        case "a": return "o".charCodeAt(0); 
        case "e": return "y".charCodeAt(0); 
        case "i": return "a".charCodeAt(0); 
        case "o": return "u".charCodeAt(0); 
        case "u": return "i".charCodeAt(0); 
        case "y": return "e".charCodeAt(0);

        case "b": return "d".charCodeAt(0);
        case "p": return "t".charCodeAt(0);
        case "j": return "g".charCodeAt(0);
        case "g": return "p".charCodeAt(0);
        case "d": return "j".charCodeAt(0);
        case "t": return "b".charCodeAt(0);

        case "c": return "k".charCodeAt(0);
        case "k": return "s".charCodeAt(0);
        case "s": return "z".charCodeAt(0);
        case "z": return "c".charCodeAt(0);

        case "f": return "v".charCodeAt(0);
        case "v": return "w".charCodeAt(0);
        case "w": return "f".charCodeAt(0); 

        case "h": return "l".charCodeAt(0);
        case "l": return "r".charCodeAt(0); 
        case "r": return "h".charCodeAt(0); 

        case "m": return "n".charCodeAt(0);
        case "n": return "m".charCodeAt(0);

        case "q": return "x".charCodeAt(0);
        case "x": return "q".charCodeAt(0);

        default: return c;
    }
};


/**
 * Returns the number of consonants at the start of the given string
 * before the first vowel, or -1 if there are no vowels
 */
export const count_consonants = (L: List<number>): bigint => {
    if (L.kind === "nil") {
        return -1n;
    } else if (is_latin_vowel(L.hd)) {
        return 0n;
    } else if (is_latin_consonant(L.hd)) {
        const n = count_consonants(L.tl);
        if (n === -1n) {
            return -1n;
        } else {
            return n + 1n;
        }
    } else {
        // not a vowel or a consonant
        return -1n;
    }
};


// TODO: add your function declarations in this file for: 
// cipher_encode, cipher_decode crazy_caps_encode, crazy_caps_decode,
// frog_latin_encode, frog_latin_decode

// * Remember to add /** jsdoc */ comments above each function! The contents
//   won't be graded, but a brief description is appropriate (see the above
//   functions for an example)

/**
 * Takes a list of characters as an argument and returns a list of the same
 * length but with each character replaced by the ‘next’ Latin character
 */
export const cipher_encode = (L: List<number>): List<number> => {
    if (L.kind === 'nil') {
        return L;
    } else {
        return cons(next_latin_char(L.hd), cipher_encode(L.tl));
    }
};

/**
 * Takes a list of characters as an argument and returns a list of the same
 * length but with each character replaced by the ‘previous’ Latin character
 */
export const cipher_decode = (L: List<number>): List<number> => {
    if (L.kind === 'nil') {
        return L;
    } else {
        return cons(prev_latin_char(L.hd), cipher_decode(L.tl));
    }
};

/**
 * Takes a list of characters as an argument and returns a list of the same length
 * but with every other character, starting with the second, made upper case
 */
export const crazy_caps_encode = (L: List<number>): List<number> => {
    if (L.kind === 'nil') {
        return L;
    } else if (L.tl.kind === 'nil') {
        return L;
    } else {
        const a = String.fromCharCode(L.tl.hd).toUpperCase().charCodeAt(0);
        return cons(L.hd, cons(a, crazy_caps_encode(L.tl.tl)));
    }
};

/** Takes a list of characters as an argument and returns a list of the same length
 * but with every other character, starting with the second, made lower case”.
 */
export const crazy_caps_decode = (L: List<number>): List<number> => {
    if (L.kind === 'nil') {
        return L;
    } else if (L.tl.kind === 'nil') {
        return L;
    } else {
        const a = String.fromCharCode(L.tl.hd).toLowerCase().charCodeAt(0);
        return cons(L.hd, cons(a, crazy_caps_decode(L.tl.tl)));
    }
};

/** Translates a word from Frog Latin to English. */
export const frog_latin_encode = (L: List<number>): List<number> => {
    if (count_consonants(L) === -1n) {
        return L;
    } else {
        if (count_consonants(L) === 0n) {
            return concat(cons("f".charCodeAt(0), L), explode("rog"));
        } else {
            const pre: List<number> = prefix(count_consonants(L), L);
            const suf: List<number> = suffix(count_consonants(L), L);
            return concat(concat(suf, pre), explode("rog"));
        }
    }
};

/** Translates a word from Frog latin to English */
export const frog_latin_decode = (L: List<number>): List<number> => {
    if (L.kind !== "nil" && L.hd === "f".charCodeAt(0) && count_consonants(L) === 1n
         && compact(prefix(3n, rev(L))) === "gor" && len(L) > 4n) {
        return suffix(1n, rev(suffix(3n, rev(L))));
    } else if (count_consonants(L) === 0n && count_consonants(suffix(3n, rev(L))) >= 1n
         && compact(prefix(3n, rev(L))) === "gor" && len(L) > 4n) {
        const x = suffix(3n, rev(L));
        const pre = prefix(count_consonants(x), x);
        const suf = suffix(count_consonants(x), x);
        return concat(rev(pre), rev(suf));
    } else {
        return L;
    }
};
