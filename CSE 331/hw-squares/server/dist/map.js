"use strict";
// TODO (Q5): 
//  a) Copy over your mutable map interface from HW7
//  b) Add a function that gets all the keys from the map
//  c) Create a class that implements the interface with a TS Map as its field
//  d) Implement a factory function that creates a new instance of the class
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSimpleMap = void 0;
// Implementation of the Map interface using an AssocList
class SimpleMap {
    // Creates a new SimpleMap with no key-value pairs.
    constructor() {
        this.contains = (key) => {
            return this.map.has(key);
        };
        this.get = (key) => {
            return this.map.get(key);
        };
        this.set = (key, value) => {
            if (this.contains(key)) {
                this.map.set(key, value);
                return true;
            }
            else {
                this.map.set(key, value);
                return false;
            }
        };
        this.clear = () => {
            this.map.clear();
        };
        this.get_keys = () => {
            return Array.from(this.map.keys());
        };
        this.map = new Map();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL21hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsY0FBYztBQUNkLG9EQUFvRDtBQUNwRCx5REFBeUQ7QUFDekQsOEVBQThFO0FBQzlFLDRFQUE0RTs7O0FBa0Q1RSx5REFBeUQ7QUFDekQsTUFBTSxTQUFTO0lBSWIsbURBQW1EO0lBQ25EO1FBSUEsYUFBUSxHQUFHLENBQUMsR0FBVyxFQUFXLEVBQUU7WUFDbEMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUE7UUFFRCxRQUFHLEdBQUcsQ0FBQyxHQUFXLEVBQVcsRUFBRTtZQUM3QixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQTtRQUVELFFBQUcsR0FBRyxDQUFDLEdBQVcsRUFBRSxLQUFjLEVBQVcsRUFBRTtZQUM3QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3RCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDekIsT0FBTyxJQUFJLENBQUM7YUFDYjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7Z0JBQ3pCLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7UUFDTCxDQUFDLENBQUE7UUFFQyxVQUFLLEdBQUcsR0FBUyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkIsQ0FBQyxDQUFBO1FBRUQsYUFBUSxHQUFHLEdBQWEsRUFBRTtZQUN4QixPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQTtRQTNCQyxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksR0FBRyxFQUFtQixDQUFDO0lBQ3hDLENBQUM7Q0EyQkY7QUFFRCx3QkFBd0I7QUFDeEIsTUFBTSxHQUFHLEdBQWUsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUV4Qzs7O0dBR0c7QUFDSSxNQUFNLGFBQWEsR0FBRyxHQUFlLEVBQUU7SUFDNUMsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDLENBQUM7QUFGVyxRQUFBLGFBQWEsaUJBRXhCIn0=