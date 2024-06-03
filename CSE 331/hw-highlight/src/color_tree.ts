import { List, len, nil, split} from './list';
import { COLORS, ColorDetails } from './colors';
import { ColorNode, empty, node } from './color_node';
import { ColorList, findNameSetIn } from './color_list';

// TODO: Uncomment, implement, and write JSDoc

/** 
 * Returns a new binary search tree (BST) of colors built from the given
 * list of colors.
 * @param L The list of colors to build the BST from
 * @returns A new BST of colors built from the given list of colors
 */
export const buildBst = (L: List<ColorDetails>): ColorNode => {
    // Note: the implementation of this function requires you to use
    //   Math.floor() which takes a number, so you will need to use BigInt()
    //    and Number() to convert types as needed
  if (L.kind === "nil") {
    return empty;
  } else {
    const mid = len(L) / 2n;
    const [left, right] = split(mid, L);
    if (right.kind !== "nil") {
      return node(right.hd, buildBst(left), buildBst(right.tl));
    } else {
      throw new Error("Error: nil returned from split despite non-nil input");
    }
  }
};

/**
 * Returns the details of the color with the given name in the given BST.
 * @param y The name of the color to search for
 * @param root The root of the BST to search in
 * @returns The details of the color with the given name in the given BST, or
 *   undefined if no such color exists
 */
export const search = (y: string, root: ColorNode): ColorDetails | undefined => {
  if (root.kind === "empty") {
    return undefined;
  } else if (y === root.details[0]) {
    return root.details;
  } else if (y > root.details[0]) {
    return search(y, root.after);
  } else {
    return search(y, root.before);
  }
};

// TODO: add other classes or functions here as needed

// Implementation of the ColorList interface that caches the colors in a List and BST
class ColorTree implements ColorList {
  // AF: obj = this.colors
  // RI: tree = builbBst(colors)
  readonly colors: List<ColorDetails>;
  readonly tree: ColorNode;

  // Creates a new SimpleColorList with the given list of colors
  constructor(colors: List<ColorDetails>) {
    this.colors = colors;
    this.tree = buildBst(colors);
  }

  findNameSet = (text: string): List<string> => {
    return findNameSetIn(text, this.colors);
  };

  getColorCss = (name: string): readonly [string, string] => {
    const details = search(name, this.tree);
    if (details === undefined) {
      throw new Error(`no color called "${name}"`);
    } else {
      return [details[1], details[2] ? '#F0F0F0' : '#101010']
    }
  };
}

const colors: ColorTree = new ColorTree(COLORS);

/**
 * Returns a new binary search tree (BST) of colors from COLORS.
 * @returns A BST that uses colors from the COLORS list.
 */
export const makeColorTree = (): ColorTree => {
  return colors;
}