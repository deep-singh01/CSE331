import { ColorDetails, COLORS } from './colors';
import { List, cons, nil } from './list';

// TODO: add interfaces and classes here in part 1
/** Represents a list of colors and provides methods to find colors and their CSS values. */
export interface ColorList {

  /**
   * Returns a list of all color names that include the given text
   * @param text Text to look for in the names of the colors (case insensitive)
   * @returns list of all color names that include the given text
   */
  findNameSet: (text: string) => List<string>;

  /**
   * Returns the background and foreground CSS colors to highlight with this color.
   * @param name Name of the color to look for
   * @throws Error if there is no such color
   * @returns (bg, fg) where bg is the CSS background color and fg is foreground
   */
  getColorCss: (name: string) => readonly [string, string];
}

// Implementation of the ColorList interface that caches that colors in a List
class SimpleColorList implements ColorList {
  // AF: obj = this.colors
  readonly colors: List<ColorDetails>;

  // Creates a new SimpleColorList with the given list of colors
  constructor(colors: List<ColorDetails>) {
    this.colors = colors;
  }

  findNameSet = (text: string): List<string> => {
    return findNameSetIn(text, this.colors);
  };

  getColorCss = (name: string): readonly [string, string] => {
    return getColorCssIn(name, this.colors);
  };
}

// Instance of SimpleColorList that uses colors from the COLORS list
const colorList: ColorList = new SimpleColorList(COLORS);

/**
 * Returns a returns an instance of SimpleColorList that uses colors from
 * the COLORS list.
 * @returns A color list that uses colors from the COLORS list.
 */
export const makeSimpleColorList = (): ColorList => {
  return colorList;
};

/** Returns a new list containing just the names of those colors that include the
 * given text.
 * @param text The text in question
 * @param colors The full list of colors
 * @returns The sublist of colors containing those colors whose names contain
 *    the given text.
 */
export const findNameSetIn =
    (text: string, colors: List<ColorDetails>): List<string> => {
  if (colors.kind === "nil") {
    return nil;
  } else {
    // Note: the _ keeps the typechecker from complaining about our not using
    // these variables (but we must define them to avoid tuple indexing)
    const [color, _css, _foreground] = colors.hd;
    if (color.includes(text)) {
      return cons(color, findNameSetIn(text, colors.tl));
    } else {
      return findNameSetIn(text, colors.tl);
    }
  }
};

// Returns the colors from the (first) list entry with this color name. Throws
// an Error none is found (i.e., we hit the end of the list).
// @param name The name in question.
// @param colors The full list of colors.
// @throws Error if no item in colors has the given name.
// @return The first item in colors whose name matches the given name.
const getColorCssIn =
    (name: string, colors: List<ColorDetails>): readonly [string, string] => {
  if (colors.kind === "nil") {
    throw new Error(`no color called "${name}"`);
  } else {
    const [color, css, foreground] = colors.hd;
    if (color === name) {
      return [css, foreground ? '#F0F0F0' : '#101010'];
    } else {
      return getColorCssIn(name, colors.tl);
    }
  }
};
