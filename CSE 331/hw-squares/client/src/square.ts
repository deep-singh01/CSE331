import { List } from './list';


export type Color = "white" | "red" | "orange" | "yellow" | "green" | "blue" | "purple";

/** 
 * Converts a string to a color (or throws an exception if not a color). 
 * @param s string to convert to color
 */
export const toColor = (s: string): Color => {
  switch (s) {
    case "white": case "red": case "orange": case "yellow":
    case "green": case "blue": case "purple":
      return s;

    default:
      throw new Error(`unknown color "${s}"`);
  }
};

export type Square =
    | {readonly kind: "solid", readonly color: Color}
    | {readonly kind: "split", readonly nw: Square, readonly ne: Square,
       readonly sw: Square, readonly se: Square};

/** 
 * Returns a solid square of the given color. 
 * @param color of square to return
 * @returns square of given color
 */
export const solid = (color: Color): Square => {
  return {kind: "solid", color: color};
};

/** 
 * Returns a square that splits into the four given parts. 
 * @param nw square in nw corner of returned square
 * @param ne square in ne corner of returned square
 * @param sw square in sw corner of returned square
 * @param se square in se corner of returned square
 * @returns new square composed of given squares
 */
export const split =
    (nw: Square, ne: Square, sw: Square, se: Square): Square => {
  return {kind: "split", nw: nw, ne: ne, sw: sw, se: se};
};

export type Dir = "NW" | "NE" | "SE" | "SW";

/** Describes how to get to a square from the root of the tree. */
export type Path = List<Dir>;


/** 
 * Creates a JSON representation of given Square. 
 * @param sq to convert to JSON
 * @returns JSON describing the given square
 */
export const toJson = (sq: Square): unknown => {
  if (sq.kind === "solid") {
    return sq.color;
  } else {
    return [toJson(sq.nw), toJson(sq.ne), toJson(sq.sw), toJson(sq.se)];
  }
};

/** 
 * Converts a JSON description to the Square it describes. 
 * @param data in JSON form to try to parse as Square
 * @returns a Square parsed from given data
 */
export const fromJson = (data: unknown): Square => {
  if (typeof data === 'string') {
    return solid(toColor(data))
  } else if (Array.isArray(data)) {
    if (data.length === 4) {
      return split(fromJson(data[0]), fromJson(data[1]),
                   fromJson(data[2]), fromJson(data[3]));
    } else {
      throw new Error('split must have 4 parts');
    }
  } else {
    throw new Error(`type ${typeof data} is not a valid square`);
  }
}

/** 
 * Given a square and a path, retrieves the root of the subtree
 * at that location (assuming it exists) 
 * @param path to follow to get to desired square
 * @param sq square to start from
 * @returns square at the end of the given path or 
 * throws an error if path does not exist
 */
export const get = (path: Path, sq: Square): Square => {
  if (path.kind === "nil") {
    return sq;
  } else {
      if (sq.kind == "solid") {
      throw new Error("path does not exist");
    } else {
      const dir: Dir = path.hd;
      switch (dir) {
        case "NW":
          return get(path.tl, sq.nw);
        case "NE":
          return get(path.tl, sq.ne);
        case "SW":
          return get(path.tl, sq.sw);
        case "SE":
          return get(path.tl, sq.se);
      }
    }
  }
}

/** Given a square, a path, and a second square, returns a new
 * square that is the same as the first one except that the 
 * subtree whose root is at the given path is replaced by the 
 * second square.
 * @param path to follow to get to desired square
 * @param sq square to start from
 * @param newSq square to replace the old one with
 * @returns new square with the subtree at the given path replaced
 * by the new square or throws an error if path does not exist
 */
export const newSquare = (path: Path, sq: Square, newSq: Square): Square => {
  if (path.kind === "nil") {
    return newSq;
  } else {
    if (sq.kind === "solid") {
      throw new Error("path does not exist");
    } else {
      const dir: Dir = path.hd;
      switch (dir) {
        case "NW":
          return split(newSquare(path.tl, sq.nw, newSq), sq.ne, sq.sw, sq.se);
        case "NE":
          return split(sq.nw, newSquare(path.tl, sq.ne, newSq), sq.sw, sq.se);
        case "SW":
          return split(sq.nw, sq.ne, newSquare(path.tl, sq.sw, newSq), sq.se);
        case "SE":
          return split(sq.nw, sq.ne, sq.sw, newSquare(path.tl, sq.se, newSq));
      }
    }
  }
}
