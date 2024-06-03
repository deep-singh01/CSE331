import { isRecord } from "./record";


// Description of an individual auction
// RI: minBid, maxBid >= 0
export type Auction = {
  readonly name: string,
  readonly description: string,
  readonly seller: string,
  readonly endTime: number,  // ms since epoch
  readonly maxBid: number,
  readonly maxBidder: string
};


/**
 * Parses unknown data into an Auction. Will log an error and return undefined
 * if it is not a valid Auction.
 * @param val unknown data to parse into an Auction
 * @return Auction if val is a valid Auction and undefined otherwise
 */
export const parseAuction = (val: unknown): undefined | Auction => {
  if (!isRecord(val)) {
    console.error("not an auction", val)
    return undefined;
  }

  if (typeof val.name !== "string") {
    console.error("not an auction: missing 'name'", val)
    return undefined;
  }

  if (typeof val.description !== "string") {
    console.error("not an auction: missing 'description'", val)
    return undefined;
  }

  if (typeof val.seller !== "string") {
    console.error("not an auction: missing 'seller'", val)
    return undefined;
  }

  if (typeof val.maxBid !== "number" || val.maxBid < 0 || isNaN(val.maxBid)) {
    console.error("not an auction: missing or invalid 'maxBid'", val)
    return undefined;
  }

  if (typeof val.maxBidder !== "string") {
    console.error("not an auction: missing or invalid 'maxBidder'", val)
    return undefined;
  }

  if (typeof val.endTime !== "number" || val.endTime < 0 || isNaN(val.endTime)) {
    console.error("not an auction: missing or invalid 'endTime'", val)
    return undefined;
  }

  return {
    name: val.name, description: val.description, seller: val.seller, maxBid:
    val.maxBid, maxBidder: val.maxBidder, endTime: val.endTime
  };
};