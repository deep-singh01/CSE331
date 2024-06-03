import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check


// TODO: remove the dummy route
type Guest = {
  readonly name: string,
  readonly guestOf: "Molly" | "James" | "unknown",
  readonly family: boolean,
  readonly dietRestrictions?: string,
  readonly hasPlusOne?: 0 | 1,
  readonly plusOneName?: string,
  readonly plusOneDietRest?: string
};

// Map from name to auction details.
const guests: Map<string, Guest> = new Map();

/**
 * Dummy route that just returns a hello message to the client.
 * @param req The request object
 * @param res The response object
 */
export const dummy = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(400).send('missing or invalid "name" parameter');
    return;
  }

  res.send({msg: `Hi, ${name}!`});
};

/**
 * Returns a list of all the guests, sorted so that the ongoing guests come
 * first, with the ones about to end listed first, and the completed ones after,
 * with the ones completed more recently
 * @param _req the request
 * @param res the response
 */
export const listGuests = (_req: SafeRequest, res: SafeResponse): void => {
  const guest = Array.from(guests.values());
  res.send({guests: guest});
};

/**
 * Add the guest to the list.
 * @param req the request
 * @param res the response
 */
export const addGuest = (req: SafeRequest, res: SafeResponse): void => {
  const name = req.body.name;
  if (typeof name !== 'string') {
    res.status(400).send("missing 'name' parameter");
    return;
  }

  const guestOf = req.body.guestOf;
  if (guestOf !== 'Molly' && guestOf !== 'James') {
    res.status(400).send("missing 'guestOf' parameter");
    return;
  }

  const family = req.body.family;
  if (typeof family !== 'boolean') {
    res.status(400).send("missing 'family' parameter");
    return;
  }

  if (!guests.has(name)) {
    const guest: Guest = {name: name, guestOf: guestOf, family: family};
    guests.set(guest.name, guest); 
    res.send({guest: guest});
    return;
  }

  const dietRestrictions = req.body.dietRestrictions;
  if (typeof dietRestrictions !== 'string') {
    res.status(400).send("missing 'dietRestrictions' parameter");
    return;
  }

  const hasPlusOne = req.body.hasPlusOne;
  const plusOneName = req.body.plusOneName;
  const plusOneDietRest = req.body.plusOneDietRest;

  if (hasPlusOne !== undefined) {
    if (hasPlusOne !== 0 && hasPlusOne !== 1) {
      res.status(400).send("hasPlusOne is not an appropriate number");
      return;
    }
    if (hasPlusOne == 1) {
      if (typeof plusOneName !== 'string') {
        res.status(400).send("missing 'plusOneName' parameter");
        return;
      }
      if (typeof plusOneDietRest !== 'string') {
        res.status(400).send("missing 'plusOneDietRest parameter");
        return;
      }
      const guest: Guest = {
        name: name, 
        guestOf: guestOf,
        family: family, 
        dietRestrictions: dietRestrictions,
        hasPlusOne: hasPlusOne,
        plusOneName: plusOneName,
        plusOneDietRest: plusOneDietRest};
      guests.set(guest.name, guest); 
      res.send({guest: guest});
      return;
    }

    const guest: Guest = {
      name: name,
      guestOf: guestOf,
      family: family,
      dietRestrictions: dietRestrictions,
      hasPlusOne: hasPlusOne
    };
    guests.set(guest.name, guest); 
    res.send({guest: guest});
    return;
  }

  const guest: Guest = {
    name: name,
    guestOf: guestOf,
    family: family,
    dietRestrictions: dietRestrictions
  };
  guests.set(guest.name, guest); // add this to the map of guests
  res.send({guest: guest});  // send the guest we added
}

/**
 * Retrieves the current state of a given guest.
 * @param req the request
 * @param req the response
 */
export const getGuest= (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(400).send("missing 'name' parameter");
    return;
  }

  const guest = guests.get(name);
  if (guest === undefined) {
    res.status(400).send(`guest with name: '${name}' does not exist`);
    return;
  }

  res.send({guest: guest});  // send back the current guest state
}


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
};

/** 
 * Clears the Guests stored in the server.
 * (Only used for testing purposes.)
 */
export const clearGuests = (): void => {
  guests.clear();
};
