"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSimpleMap = void 0;
// TODO: create your new mutable map interface, class that implements it with an
//       association list, and factory function to initialize a new blank map
const assoc_1 = require("./assoc");
const list_1 = require("./list");
// Implementation of the Map interface using an AssocList
class SimpleMap {
    // Creates a new SimpleMap with no key-value pairs.
    constructor() {
        this.contains = (key) => {
            return (0, assoc_1.contains_key)(key, this.map);
        };
        this.get = (key) => {
            return (0, assoc_1.get_value)(key, this.map);
        };
        this.set = (key, value) => {
            let replaced = false;
            if (this.contains(key)) {
                replaced = true;
            }
            this.map = (0, list_1.cons)([key, value], this.map);
            return replaced;
        };
        this.clear = () => {
            this.map = list_1.nil;
        };
        this.map = list_1.nil;
    }
}
// Instance of SimpleMap
const map = new SimpleMap();
/**
 * Returns a returns an instance of SimpleMap.
 * @returns a map with no key-value pairs.
 */
const makeSimpleMap = () => {
    return map;
};
exports.makeSimpleMap = makeSimpleMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxnRkFBZ0Y7QUFDaEYsNkVBQTZFO0FBQzdFLG1DQUE2RDtBQUM3RCxpQ0FBbUM7QUF5Q25DLHlEQUF5RDtBQUN6RCxNQUFNLFNBQVM7SUFJYixtREFBbUQ7SUFDbkQ7UUFJQSxhQUFRLEdBQUcsQ0FBQyxHQUFXLEVBQVcsRUFBRTtZQUNsQyxPQUFPLElBQUEsb0JBQVksRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQTtRQUVELFFBQUcsR0FBRyxDQUFDLEdBQVcsRUFBVyxFQUFFO1lBQzdCLE9BQU8sSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDbEMsQ0FBQyxDQUFBO1FBRUQsUUFBRyxHQUFHLENBQUMsR0FBVyxFQUFFLEtBQWMsRUFBVyxFQUFFO1lBQzdDLElBQUksUUFBUSxHQUFZLEtBQUssQ0FBQztZQUM5QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3RCLFFBQVEsR0FBRyxJQUFJLENBQUM7YUFDakI7WUFDRCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUEsV0FBSSxFQUFDLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN4QyxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDLENBQUE7UUFFQyxVQUFLLEdBQUcsR0FBUyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxHQUFHLEdBQUcsVUFBRyxDQUFDO1FBQ2pCLENBQUMsQ0FBQTtRQXRCQyxJQUFJLENBQUMsR0FBRyxHQUFHLFVBQUcsQ0FBQztJQUNqQixDQUFDO0NBc0JGO0FBRUQsd0JBQXdCO0FBQ3hCLE1BQU0sR0FBRyxHQUFRLElBQUksU0FBUyxFQUFFLENBQUM7QUFFakM7OztHQUdHO0FBQ0ksTUFBTSxhQUFhLEdBQUcsR0FBUSxFQUFFO0lBQ3JDLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyxDQUFDO0FBRlcsUUFBQSxhQUFhLGlCQUV4QiJ9