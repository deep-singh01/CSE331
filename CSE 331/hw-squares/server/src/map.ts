// TODO (Q5): 
//  a) Copy over your mutable map interface from HW7
//  b) Add a function that gets all the keys from the map
//  c) Create a class that implements the interface with a TS Map as its field
//  d) Implement a factory function that creates a new instance of the class

// TODO: create your new mutable map interface, class that implements it with an
//       association list, and factory function to initialize a new blank map

/** A mutable map that stores key-value pairs. */
export interface MutableMap {

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

  /**
   * Get all the keys in the map.
   * @returns a list of all the keys in the map
   */
  get_keys: () => string[];
}

// Implementation of the Map interface using an AssocList
class SimpleMap implements MutableMap {
  // AF: obj = this.map
  private map: Map<string, unknown>;

  // Creates a new SimpleMap with no key-value pairs.
  constructor() {
    this.map = new Map<string, unknown>();
  }

  contains = (key: string): boolean => {
    return this.map.has(key);
  }

  get = (key: string): unknown => {
    return this.map.get(key);
  }

  set = (key: string, value: unknown): boolean => {
    if (this.contains(key)) {
      this.map.set(key, value);
      return true;
    } else {
      this.map.set(key, value);
      return false;
    }
}

  clear = (): void => {
    this.map.clear();
  }

  get_keys = (): string[] => {
    return Array.from(this.map.keys());
  }
}

// Instance of SimpleMap
const map: MutableMap = new SimpleMap();

/**
 * Returns a returns an instance of SimpleMap.
 * @returns a map with no key-value pairs.
 */
export const makeSimpleMap = (): MutableMap => {
  return map;
};