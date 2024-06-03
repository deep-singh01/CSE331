"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetTranscriptsForTesting = exports.load = exports.save = exports.chat = void 0;
const words_1 = require("./words");
const patterns_1 = require("./patterns");
const chatbot_1 = require("./chatbot");
const map_1 = require("./map");
// Keep track of possible responses for when we run out of things to say.
const memory = [];
// TODO: create a new mutable map constant to store transcripts by 
//       calling the correct factory
const transcripts = (0, map_1.makeSimpleMap)();
/**
 * Handles request for /chat, with a message included as a query parameter,
 * by getting the next chat response.
 */
const chat = (req, res) => {
    const msg = first(req.query.message);
    if (msg === undefined) {
        res.status(400).send('required argument "message" was missing');
        return;
    }
    const words = (0, words_1.splitWords)(msg);
    const result = (0, chatbot_1.chatResponse)(words, memory, patterns_1.PATTERNS);
    res.send({ response: (0, words_1.toString)(result) });
};
exports.chat = chat;
/** Handles request for /save by storing the given transcript. */
const save = (req, res) => {
    const name = req.body.name;
    if (name === undefined || typeof name !== 'string') {
        res.status(400).send('required argument "name" was missing');
        return;
    }
    const value = req.body.value;
    if (value === undefined) {
        res.status(400).send('required argument "value" was missing');
        return;
    }
    // TODO(5a): implement this part 
    //  - store the passed in value in the map under the given name
    //  - return a record indicating whether that replaced an existing transcript
    if (transcripts.contains(name)) {
        res.send({ replaced: true });
    }
    else {
        res.send({ replaced: false }); // TODO(5a): replace
    }
    transcripts.set(name, value);
    return;
};
exports.save = save;
/** Handles request for /load by returning the transcript requested. */
const load = (req, res) => {
    // TODO(5b): implement this function
    //  - chat() & save() functions may be useful examples for error checking!
    const name = first(req.query.name);
    if (name === undefined) {
        res.status(400).send('required argument "name" was missing');
    }
    else if (!transcripts.contains(name)) {
        res.status(404).send('transcript not found');
    }
    else {
        res.send({ value: transcripts.get(name) });
    }
    return;
};
exports.load = load;
/**
 * Used in tests to set the transcripts map back to empty.
 * (exported ONLY for testing)
 */
const resetTranscriptsForTesting = () => {
    // TODO(): implement this function
    transcripts.clear();
};
exports.resetTranscriptsForTesting = resetTranscriptsForTesting;
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
const first = (param) => {
    if (Array.isArray(param) && param.length > 0) {
        return first(param[0]);
    }
    else if (typeof param === 'string') {
        return param;
    }
    else {
        return undefined;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxtQ0FBK0M7QUFDL0MseUNBQXNDO0FBQ3RDLHVDQUF5QztBQUN6QywrQkFBMkM7QUFNM0MseUVBQXlFO0FBQ3pFLE1BQU0sTUFBTSxHQUFlLEVBQUUsQ0FBQztBQUU5QixtRUFBbUU7QUFDbkUsb0NBQW9DO0FBQ3BDLE1BQU0sV0FBVyxHQUFRLElBQUEsbUJBQWEsR0FBRSxDQUFDO0FBR3pDOzs7R0FHRztBQUNJLE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFRLEVBQUU7SUFDaEUsTUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1FBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7UUFDaEUsT0FBTztLQUNSO0lBRUQsTUFBTSxLQUFLLEdBQUcsSUFBQSxrQkFBVSxFQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLE1BQU0sTUFBTSxHQUFHLElBQUEsc0JBQVksRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLG1CQUFRLENBQUMsQ0FBQztJQUNyRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUMsUUFBUSxFQUFFLElBQUEsZ0JBQVEsRUFBQyxNQUFNLENBQUMsRUFBQyxDQUFDLENBQUM7QUFDekMsQ0FBQyxDQUFBO0FBVlksUUFBQSxJQUFJLFFBVWhCO0FBRUQsaUVBQWlFO0FBQzFELE1BQU0sSUFBSSxHQUFHLENBQUMsR0FBZ0IsRUFBRSxHQUFpQixFQUFRLEVBQUU7SUFDaEUsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDM0IsSUFBSSxJQUFJLEtBQUssU0FBUyxJ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