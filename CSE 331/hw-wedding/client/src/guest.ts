import { isRecord } from "./record";

export type Guest = {
  readonly name: string,
  readonly guestOf: "Molly" | "James" | "unknown",
  readonly family: boolean,
  readonly dietRestrictions?: string | undefined,
  readonly hasPlusOne?: 0 | 1,
  readonly plusOneName?: string,
  readonly plusOneDietRest?: string
};

/**
 * Parses unknown data into a Guest. Will log an error and return undefined
 * if it is not a valid Guest.
 * @param val unknown data to parse into a Guest
 * @return Guest if val is a valid Guest and undefined otherwise
 */
export const parseGuest = (val: unknown): undefined | Guest => {
  if (!isRecord(val)) {
    console.error("not a guest", val)
    return undefined;
  }

  if (typeof val.name !== "string") {
    console.error("not a guest: missing 'name'", val)
    return undefined;
  }

  if (val.guestOf !== "Molly" && val.guestOf !== "James" && val.guestOf !== "unknown") {
    console.error("not a guest: missing 'guestOf'", val)
    return undefined;
  }

  if (typeof val.family !== "boolean") {
    console.error("not a guest: missing 'family'", val)
    return undefined;
  }

  if (val.dietRestrictions === undefined) {
    return {name: val.name, guestOf: val.guestOf, family: val.family};
  } 

  if (typeof val.dietRestrictions !== "string") {
    console.error("not a guest: missing or invalid 'dietRestrictions'", val)
    return undefined;
  }

  if (val.hasPlusOne !== undefined) {
    if (val.hasPlusOne === 0) {
      return {
        name: val.name,
        guestOf: val.guestOf,
        family: val.family,
        dietRestrictions: val.dietRestrictions,
        hasPlusOne: 0
      };
    } else {
      if (typeof val.plusOneName !== "string") {
        console.error("not a guest: missing 'name' in 'hasPlusOne'", val)
        return undefined;
      }

      if (typeof val.plusOneDietRest !== "string") {
        console.error("not a guest: missing 'dietRestrictions' in 'hasPlusOne'", val)
        return undefined;
      }
      return {
        name: val.name,
        guestOf: val.guestOf,
        family: val.family,
        dietRestrictions: val.dietRestrictions,
        hasPlusOne: 1,
        plusOneName: val.plusOneName, 
        plusOneDietRest: val.plusOneDietRest
      };
    }
  }
  return {
    name: val.name,
    guestOf: val.guestOf,
    family: val.family,
    dietRestrictions: val.dietRestrictions
  };
};

/**
 * Calculates the number of guests and family members for a given guest.
 * @param guestOf the member of the couple the guest is associated with
 * @param guests the list of guests to calculate from
 * @return an array with the range of guests (min, max), and the number of family members (family)
 */
export const calcGuestsAndFam = (guestOf: "Molly" | "James", guests: Guest[]): {min: number, max: number, family: number} => {
  const counts = {min: 0, max: 0, family: 0};
  for (const guest of guests) {
    if (guest.guestOf === guestOf) {
      if (guest.hasPlusOne === undefined) {
        counts.min += 1;
        counts.max += 2;
      } else if (guest.hasPlusOne === 1) {
        counts.min += 2;
        counts.max += 2;
      } else {
        counts.min += 1;
        counts.max += 1;
      }
      if (guest.family) {
        counts.family += 1;
      }
    }
  }
  return counts;
};