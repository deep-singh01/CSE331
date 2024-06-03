import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check


// Description of an individual auction
// RI: minBid, maxBid >= 0
type Auction = {
  name: string,
  seller: string,
  description: string,
  endTime: number,  // ms since epoch
  maxBid: number,
  maxBidder: string
};


// Map from name to auction details.
const auctions: Map<string, Auction> = new Map();


/** Testing function to remove all the added auctions. */
export const resetForTesting = (): void => {
  auctions.clear();
};

/** Testing function to move all end times forward the given amount (of ms). */
export const advanceTimeForTesting = (ms: number): void => {
  for (const auction of auctions.values()) {
    auction.endTime -= ms;
  }
};


// Sort auctions with the ones finishing soonest first, but with all those that
// are completed after those that are not and in reverse order by end time.
const compareAuctions = (a: Auction, b: Auction): number => {
  const now: number = Date.now();
  const endA = now <= a.endTime ? a.endTime : 1e15 - a.endTime;
  const endB = now <= b.endTime ? b.endTime : 1e15 - b.endTime;
  return endA - endB;
};

/**
 * Returns a list of all the auctions, sorted so that the ongoing auctions come
 * first, with the ones about to end listed first, and the completed ones after,
 * with the ones completed more recently
 * @param _req the request
 * @param res the response
 */
export const listAuctions = (_req: SafeRequest, res: SafeResponse): void => {
  const vals = Array.from(auctions.values());
  vals.sort(compareAuctions);
  res.send({auctions: vals});
};


/**
 * Add the item to the list.
 * @param req the request
 * @param res the response
 */
export const addAuction = (req: SafeRequest, res: SafeResponse): void => {
  const name = req.body.name;
  if (typeof name !== 'string') {
    res.status(400).send("missing 'name' parameter");
    return;
  }

  const seller = req.body.seller;
  if (typeof seller !== 'string') {
    res.status(400).send("missing 'seller' parameter");
    return;
  }

  const description = req.body.description;
  if (typeof description !== 'string') {
    res.status(400).send("missing 'description' parameter");
    return;
  }

  const minBid = req.body.minBid;
  if (typeof minBid !== "number") {
    res.status(400).send(`'minBid' is not a number: ${minBid}`);
    return;
  } else if (isNaN(minBid) || minBid < 1 || Math.round(minBid) !== minBid) {
    res.status(400).send(`'minBid' is not a positive integer: ${minBid}`);
    return;
  }

  const minutes = req.body.minutes;
  if (typeof minutes !== "number") {
    res.status(400).send(`'minutes' is not a number: ${minutes}`);
    return;
  } else if (isNaN(minutes) || minutes < 1 || Math.round(minutes) !== minutes) {
    res.status(400).send(`'minutes' is not a positive integer: ${minutes}`);
    return;
  }

  // Make sure there is no auction with this name already.
  if (auctions.has(name)) {
    res.status(400).send(`auction for '${name}' already exists`);
    return;
  }

  const auction: Auction = {
    name: name,
    description: description,
    seller: seller,
    endTime: Date.now() + minutes * 60 * 1000,  // convert to ms
    maxBid: minBid - 1,
    maxBidder: seller
  };
  auctions.set(auction.name, auction); // add this to the map of auctions
  res.send({auction: auction});  // send the auction we made
}


/**
 * Bids in an auction, increasing the maximum bid if the bid is higher.
 * @param req the request
 * @param req the response
 */
export const bidInAuction = (req: SafeRequest, res: SafeResponse): void => {
  const bidder = req.body.bidder;
  if (typeof bidder !== 'string') {
    res.status(400).send("missing or invalid 'bidder' parameter");
    return;
  }

  const name = req.body.name;
  if (typeof name !== "string") {
    res.status(400).send("missing or invalid 'name' parameter");
    return;
  }

  const auction = auctions.get(name);
  if (auction === undefined) {
    res.status(400).send(`no auction with name '${name}'`);
    return;
  }

  const now = Date.now();
  if (now >= auction.endTime) {
    res.status(400).send(`auction for "${auction.name}" has already ended`);
    return;
  }

  const amount = req.body.amount;
  if (typeof amount !== "number") {
    res.status(400).send(`'amount' is not a number: ${amount}`);
    return;
  } else if (isNaN(amount) || amount < 1 || Math.round(amount) !== amount) {
    res.status(400).send(`'amount' is not a positive integer: ${amount}`);
    return;
  } else if (amount <= auction.maxBid) {
    res.status(400).send(
        `'amount' is not more than max bid: ${amount} <= ${auction.maxBid}`);
    return;
  }

  auction.maxBid = amount;
  auction.maxBidder = bidder;
  res.send({auction: auction});  // send back the updated auction state
}


/**
 * Retrieves the current state of a given auction.
 * @param req the request
 * @param req the response
 */
export const getAuction = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(400).send("missing 'name' parameter");
    return;
  }

  const auction = auctions.get(name);
  if (auction === undefined) {
    res.status(400).send(`no auction with name '${name}'`);
    return;
  }

  res.send({auction: auction});  // send back the current auction state
}


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param: unknown): string|undefined => {
  if (Array.isArray(param) && param.length > 0) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
}
