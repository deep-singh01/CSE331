"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assemble = exports.applyPattern = exports.matchPattern = exports.chatResponse = exports.clearLastUsedForTesting = exports.getInLastUsedForTesting = void 0;
const words_1 = require("./words");
const list_1 = require("./list");
const map_1 = require("./map");
// TODO: for every instance of "TODO: update" in this file, replace the
// following line with a call to LastUsed.X, where X is the method of your
// mutable map ADT with the same behavior
// TODO: update to use your mutable map ADT by calling  factory function
let LastUsed = (0, map_1.makeSimpleMap)();
/**
 * Gets the value for the given key in LastUsed
 * (exported ONLY for testing)
 * @param key to get the corresponding value of in LastUsed map, must be in map
 * @returns value paired with key in LastUsed map
 */
const getInLastUsedForTesting = (key) => {
    // TODO: update
    return LastUsed.get(key);
};
exports.getInLastUsedForTesting = getInLastUsedForTesting;
/**
 * Clears LastUsed for testing
 * (exported ONLY for testing)
 */
const clearLastUsedForTesting = () => {
    // TODO: update
    LastUsed.clear();
};
exports.clearLastUsedForTesting = clearLastUsedForTesting;
// List of replacements to make in the input words.
const INPUT_REPLACEMENTS = (0, list_1.explode_array)([
    ["dont", ["don't"]],
    ["cant", ["can't"]],
    ["wont", ["won't"]],
    ["recollect", ["remember"]],
    ["dreamt", ["dreamed"]],
    ["dreams", ["dream"]],
    ["maybe", ["perhaps"]],
    ["how", ["what"]],
    ["when", ["what"]],
    ["certainly", ["yes"]],
    ["machine", ["computer"]],
    ["computers", ["computer"]],
    ["were", ["was"]],
    ["you're", ["you", "are"]],
    ["i'm", ["i", "am"]],
    ["same", ["alike"]],
]);
// List of replacements to make in the output words.
const OUTPUT_REPLACEMENTS = (0, list_1.explode_array)([
    ["am", ["are"]],
    ["your", ["my"]],
    ["me", ["you"]],
    ["myself", ["yourself"]],
    ["yourself", ["myself"]],
    ["i", ["you"]],
    ["you", ["I"]],
    ["my", ["your"]],
    ["i'm", ["you", "are"]],
]);
// Pattern to use if nothing above matches.
const DEFAULT_PATTERN = {
    name: ".none",
    contains: [],
    responses: [
        ["I'm", "not", "sure", "I", "understand", "you", "fully", "."],
        ["Please", "go", "on", "."],
        ["What", "does", "that", "suggest", "to", "you", "?"],
        ["Do", "you", "feel", "strongly", "about", "discussing", "such", "things", "?"]
    ]
};
/**
 * Returns the next response from the chatbot.
 * @param words words in the user's message
 * @param memory
 * @param patterns set of word patterns to use
 * @modifies memory
 * @returns words of the response
 */
const chatResponse = (words, memory, patterns) => {
    // Start by making the substitutions listed above.
    words = (0, words_1.replaceWords)(words, INPUT_REPLACEMENTS);
    // Try the patterns in the order they appear. Use the first* that matches.
    // Use the next unused reponse for the matching pattern.
    // * The one exception to this is "my", which is instead pushed to memory.
    for (const pat of patterns) {
        const args = (0, exports.matchPattern)(words, pat.contains);
        if (args !== undefined) {
            const out_args = [];
            for (const arg of args)
                out_args.push((0, words_1.replaceWords)(arg, OUTPUT_REPLACEMENTS));
            const result = (0, exports.applyPattern)(pat, out_args);
            if (pat.name === "my") {
                memory.push(result);
            }
            else {
                return result;
            }
        }
    }
    // If we have something saved to memory, then pop and return it. Otherwise,
    // we just make up a default response.
    const result = memory.pop();
    if (result !== undefined) {
        return result;
    }
    else {
        return (0, exports.applyPattern)(DEFAULT_PATTERN, []);
    }
};
exports.chatResponse = chatResponse;
/**
 * Returns the arguments from the given words if those words match the given
 * pattern and undefined if not. (See WordPattern above for more info.)
 * @param words words to check against the pattern
 * @param contains list of 1, 2, or 3 sequences of words to look for (in order)
 * @returns the text before, between, and after the required words of the
 *     pattern if they appear and undefined if not
 */
const matchPattern = (words, contains) => {
    if (contains.length < 1 || 3 < contains.length)
        throw new Error(`${contains.length} required word sequences not allowed`);
    const index1 = (0, words_1.wordsContain)(words, contains[0]);
    if (index1 < 0)
        return undefined;
    const arg1 = words.slice(0, index1);
    const words2 = words.slice(index1 + contains[0].length);
    if (contains.length === 1)
        return [arg1, words2];
    const index2 = (0, words_1.wordsContain)(words2, contains[1]);
    if (index2 < 0)
        return undefined;
    const arg2 = words2.slice(0, index2);
    const words3 = words2.slice(index2 + contains[1].length);
    if (contains.length === 2)
        return [arg1, arg2, words3];
    const index3 = (0, words_1.wordsContain)(words3, contains[2]);
    if (index3 < 0)
        return undefined;
    const arg3 = words3.slice(0, index3);
    const words4 = words3.slice(index3 + contains[2].length);
    return [arg1, arg2, arg3, words4];
};
exports.matchPattern = matchPattern;
/**
 * Returns the next response applied to the given pattern
 * @param pat pattern that matches
 * @param args arguments from matching the pattern
 * @modifies LastUsed
 * @effects changes the entry for this pattern in LastUsed to indicate which
 *    response was used
 * @returns result of substituting the arguments into the next unused response
 */
const applyPattern = (pat, args) => {
    let result = [];
    // TODO: update
    if (LastUsed.contains(pat.name)) {
        // TODO: update
        const last = LastUsed.get(pat.name);
        const next = (parseInt(String(last)) + 1) % pat.responses.length;
        result = (0, exports.assemble)(pat.responses[next], args);
        // TODO: update
        LastUsed.set(pat.name, next + "");
    }
    else {
        result = (0, exports.assemble)(pat.responses[0], args);
        // TODO: update
        LastUsed.set(pat.name, "0");
    }
    return result;
};
exports.applyPattern = applyPattern;
/**
 * Returns the result of substituting, for each number in parts, the argument at
 * the corresponding index of args.
 * @param parts mix of words and numbers that indicate arguments to substitute
 * @param args values to substitute for numbers in parts
 * @returns sub(parts, args), where
 *     sub([], args) = []
 *     sub(L @ [w], args) = sub(L) @ [w]         if w is a word
 *     sub(L @ [n], args) = sub(L) @ args[n]     if n is a number
 */
const assemble = (parts, args) => {
    const words = [];
    let j = 0;
    // Inv: words = sub(parts[0..j-1], args)
    while (j != parts.length) {
        const part = parts[j];
        if (typeof part === 'number') {
            if (part < 0 || args.length <= part)
                throw new Error(`no argument for part ${part} (only ${parts.length} args)`);
            for (const word of args[part])
                words.push(word);
        }
        else {
            words.push(part);
        }
        j = j + 1;
    }
    return words;
};
exports.assemble = assemble;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdGJvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGF0Ym90LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFxRDtBQUdyRCxpQ0FBdUM7QUFDdkMsK0JBQTJDO0FBRTNDLHVFQUF1RTtBQUN2RSwwRUFBMEU7QUFDMUUseUNBQXlDO0FBRXpDLHdFQUF3RTtBQUN4RSxJQUFJLFFBQVEsR0FBUSxJQUFBLG1CQUFhLEdBQUUsQ0FBQztBQUVwQzs7Ozs7R0FLRztBQUNJLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxHQUFXLEVBQVcsRUFBRTtJQUM5RCxlQUFlO0lBQ2YsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLENBQUMsQ0FBQTtBQUhZLFFBQUEsdUJBQXVCLDJCQUduQztBQUVEOzs7R0FHRztBQUNJLE1BQU0sdUJBQXVCLEdBQUcsR0FBUyxFQUFFO0lBQ2hELGVBQWU7SUFDZixRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7QUFDbkIsQ0FBQyxDQUFBO0FBSFksUUFBQSx1QkFBdUIsMkJBR25DO0FBSUQsbURBQW1EO0FBQ25ELE1BQU0sa0JBQWtCLEdBQ3RCLElBQUEsb0JBQWEsRUFBQztJQUNaLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQixDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25CLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDM0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2QixDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JCLENBQUMsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdEIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNq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