// TODO: create your new mutable map interface, class that implements it with an
//       association list, and factory function to initialize a new blank map
import { AssocList, contains_key, get_value } from './assoc';
import { cons, nil } from './list';

/** A mutable map that stores key-value pairs. */
export interface Map {

  /** 
   * Returns whether map contains the given key.
   * @param key to check if it is in the map
   * @returns true if the key is in the map, false otherwise
   */
  contains: (key: string) => boolean;

  /** 
   * Get the value associated with a given key if such a pair exists in the 
   * map, otherwise appropriately handle keys that do not exist.
   * @param key to get the value for
   * @returns the value associated with the given key, or undefined if the key
   *          is not in the map
   */
  get: (key: string) => unknown;

  /** 
   * Set a value for a given key in the map, replacing the current value if a
   * pair with the given key already exists. Return a boolean indicating if a
   * value was replaced.
   * @param key to set the value for
   * @param value to set for the given key
   * @modifies obj
   * @effects replaces the value associated with the given key if it exists
   * @returns true if the value was replaced, false otherwise
   */
  set: (key: string, value: unknown) => boolean;

  /** 
   * Clear all key-value pairs from the map.
   * @modifies obj
   * @effects removes all key-value pairs from the map
   */
  clear: () => void;
}

// Implementation of the Map interface using an AssocList
class SimpleMap implements Map {
  // AF: obj = this.map
  private map: AssocList<unknown>;

  // Creates a new SimpleMap with no key-value pairs.
  constructor() {
    this.map = nil;
  }

  contains = (key: string): boolean => {
    return contains_key(key, this.map);
  }

  get = (key: string): unknown => {
    return get_value(key, this.map);
  }

  set = (key: string, value: unknown): boolean => {
    let replaced: boolean = false;
    if (this.contains(key)) {
      replaced = true;
    }
    this.map = cons([key, value], this.map);
    return replaced;
}

  clear = (): void => {
    this.map = nil;
  }
}

// Instance of SimpleMap
const map: Map = new SimpleMap();

/**
 * Returns a returns an instance of SimpleMap.
 * @returns a map with no key-value pairs.
 */
export const makeSimpleMap = (): Map => {
  return map;
};