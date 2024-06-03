import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { MutableMap, makeSimpleMap } from "./map";


// Require type checking of request body.
type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;  // only writing, so no need to check

const map: MutableMap = makeSimpleMap();

/** 
 * Returns a greeting message if "name" is provided in query params
 * @param req request to respond to
 * @param res object to send response with
 */
export const dummy = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if (name === undefined) {
    res.status(400).send('missing "name" parameter');
    return;
  }

  res.send({greeting: `Hi, ${name}`});
};


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

/** Handles request for /api/save by storing the given file. */
export const save = (req: SafeRequest, res: SafeResponse): void => {
  const name = req.body.name;
  const content = req.body.content;

  if (name === undefined || typeof name !== 'string') {
    res.status(400).send('required argument "name" was missing or invalid');
    return;
  }
  
  if (content === undefined) {
    res.status(400).send('required arguement "content" (square) was missing');
    return;
  }
  map.set(name, content)
  res.status(200).send({ saved: true});
}


/** Handles request for /api/load by returning the file requested. */
export const load = (req: SafeRequest, res: SafeResponse): void => {
  const name = first(req.query.name);
  if(name === undefined || typeof name !== 'string'){
    res.status(400).send('required argument "name" was missing or invalid');
    return;
  }
  if(!map.contains(name)){
    res.status(404).send(`given square: "${name}" does not exist`);
    return;
  }
  const content = map.get(name);
  res.status(200).send({ name: name, content: content}); 
}

/** Handles request for /api/names by loading all created files */
export const names = (_req: SafeRequest, res: SafeResponse): void => {
  const names = map.get_keys();
  res.status(200).send({names: names});
}

/** 
 * Clears the files stored in the server.
 * (Only used for testing purposes.)
 */
export const clearFiles = (): void => {
  map.clear();
};
