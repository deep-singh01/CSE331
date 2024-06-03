"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearFiles = exports.names = exports.load = exports.save = exports.dummy = void 0;
const map_1 = require("./map");
const map = (0, map_1.makeSimpleMap)();
/**
 * Returns a greeting message if "name" is provided in query params
 * @param req request to respond to
 * @param res object to send response with
 */
const dummy = (req, res) => {
    const name = first(req.query.name);
    if (name === undefined) {
        res.status(400).send('missing "name" parameter');
        return;
    }
    res.send({ greeting: `Hi, ${name}` });
};
exports.dummy = dummy;
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param) => {
    if (Array.isArray(param)) {
        return first(param[0]);
    }
    else if (typeof param === 'string') {
        return param;
    }
    else {
        return undefined;
    }
};
/** Handles request for /api/save by storing the given file. */
const save = (req, res) => {
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
    map.set(name, content);
    res.status(200).send({ saved: true });
};
exports.save = save;
/** Handles request for /api/load by returning the file requested. */
const load = (req, res) => {
    const name = first(req.query.name);
    if (name === undefined || typeof name !== 'string') {
        res.status(400).send('required argument "name" was missing or invalid');
        return;
    }
    if (!map.contains(name)) {
        res.status(404).send(`given square: "${name}" does not exist`);
        return;
    }
    const content = map.get(name);
    res.status(200).send({ name: name, content: content });
};
exports.load = load;
/** Handles request for /api/names by loading all created files */
const names = (_req, res) => {
    const names = map.get_keys();
    res.status(200).send({ names: names });
};
exports.names = names;
/**
 * Clears the files stored in the server.
 * (Only used for testing purposes.)
 */
const clearFiles = () => {
    map.clear();
};
exports.clearFiles = clearFiles;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSwrQkFBa0Q7QUFPbEQsTUFBTSxHQUFHLEdBQWUsSUFBQSxtQkFBYSxHQUFFLENBQUM7QUFFeEM7Ozs7R0FJRztBQUNJLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFRLEVBQUU7SUFDakUsTUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDakQsT0FBTztLQUNSO0lBRUQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFDLFFBQVEsRUFBRSxPQUFPLElBQUksRUFBRSxFQUFDLENBQUMsQ0FBQztBQUN0QyxDQUFDLENBQUM7QUFSVyxRQUFBLEtBQUssU0FRaEI7QUFHRix3RUFBd0U7QUFDeEUsNEVBQTRFO0FBQzVFLG1EQUFtRDtBQUNuRCxNQUFNLEtBQUssR0FBRyxDQUFDLEtBQWMsRUFBb0IsRUFBRTtJQUNqRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDeEIsT0FBTyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDeEI7U0FBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUNwQyxPQUFPLEtBQUssQ0FBQztLQUNkO1NBQU07UUFDTCxPQUFPLFNBQVMsQ0FBQztLQUNsQjtBQUNILENBQUMsQ0FBQztBQUVGLCtEQUErRDtBQUN4RCxNQUFNLElBQUksR0FBRyxDQUFDLEdBQWdCLEVBQUUsR0FBaUIsRUFBUSxFQUFFO0lBQ2hFLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQzNCLE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBRWpDLElBQUksSUFBSSxLQUFLLFNBQVMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7UUFDbEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsaURBQWlELENBQUMsQ0FBQztRQUN4RSxPQUFPO0tBQ1I7SUFFRCxJQUFJLE9BQU8sS0FBSyxTQUFTLEVBQUU7UUFDekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsbURBQW1ELENBQUMsQ0FBQztRQUMxRSxPQUFPO0tBQ1I7SUFDRCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUN0QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsQ0FBQTtBQWZZLFFBQUEsSUFBSSxRQWVoQjtBQUdELHFFQUFxRTtBQUM5RCxNQUFNLElBQUksR0FBRyxDQUFDLEdBQWdCLEVBQUUsR0FBaUIsRUFBUSxFQUFFO0lBQ2hFLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25DLElBQUcsSUFBSSxLQUFLLFNBQVMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUM7UUFDaEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsaURBQWlELENBQUMsQ0FBQztRQUN4RSxPQUFPO0tBQ1I7SUFDRCxJQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBQztRQUNyQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDO1FBQy9ELE9BQU87S0FDUjtJQUNELE1BQU0sT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO0FBQ3hELENBQUMsQ0FBQTtBQVpZLFFBQUEsSUFBSSxRQVloQjtBQUVELGtFQUFrRTtBQUMzRCxNQUFNLEtBQUssR0FBRyxDQUFDLElBQWlCLEVBQUUsR0FBaUIsRUFBUSxFQUFFO0lBQ2xFLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM3QixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDO0FBQ3ZDLENBQUMsQ0FBQTtBQUhZLFFBQUEsS0FBSyxTQUdqQjtBQUVEOzs7R0FHRztBQUNJLE1BQU0sVUFBVSxHQUFHLEdBQVMsRUFBRTtJQUNuQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDZCxDQUFDLENBQUM7QUFGVyxRQUFBLFVBQVUsY0FFckIifQ==