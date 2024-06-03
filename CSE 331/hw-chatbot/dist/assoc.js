"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_value = exports.contains_key = void 0;
/**
 * Determines if the given key is within a pair in the given list
 * @param x key to determine if list contains
 * @param L list to determine if key is contained in
 * @returns contains-key(x, L)
 */
const contains_key = (x, L) => {
    if (L.kind === "nil") {
        return false;
    }
    else {
        const [y, _v] = L.hd;
        if (x === y) {
            return true;
        }
        else {
            return (0, exports.contains_key)(x, L.tl);
        }
    }
};
exports.contains_key = contains_key;
/**
 * Gets the value paired with the first instance of the given key
 * in the given list
 * @param x key to find the corresponding value for
 * @param L list to find x's value pair in
 * @returns get-value(x, L)
 * @throws Error when !contains-key(x, L)
 */
const get_value = (x, L) => {
    if (L.kind === "nil") {
        throw new Error("key is not contained in Map");
    }
    else {
        const [y, v] = L.hd;
        if (x === y) {
            return v;
        }
        else {
            return (0, exports.get_value)(x, L.tl);
        }
    }
};
exports.get_value = get_value;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvYXNzb2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBT0E7Ozs7O0dBS0c7QUFDSSxNQUFNLFlBQVksR0FBRyxDQUFLLENBQVMsRUFBRSxDQUFlLEVBQVcsRUFBRTtJQUN0RSxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ3BCLE9BQU8sS0FBSyxDQUFDO0tBQ2Q7U0FBTTtRQUNMLE1BQU0sQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQWdCLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ1gsT0FBTyxJQUFJLENBQUM7U0FDYjthQUFNO1lBQ0wsT0FBTyxJQUFBLG9CQUFZLEVBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztTQUM5QjtLQUNGO0FBQ0gsQ0FBQyxDQUFDO0FBWFcsUUFBQSxZQUFZLGdCQVd2QjtBQUdGOzs7Ozs7O0dBT0c7QUFDSSxNQUFNLFNBQVMsR0FBRyxDQUFLLENBQVMsRUFBRSxDQUFlLEVBQUssRUFBRTtJQUM3RCxJQUFJLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztLQUNoRDtTQUFPO1FBQ04sTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBZ0IsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDWCxPQUFPLENBQUMsQ0FBQztTQUNWO2FBQU07WUFDTCxPQUFPLElBQUEsaUJBQVMsRUFBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNCO0tBQ0Y7QUFDSCxDQUFDLENBQUM7QUFYVyxRQUFBLFNBQVMsYUFXcEIifQ==