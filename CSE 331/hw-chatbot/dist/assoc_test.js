"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __importStar(require("assert"));
const list_1 = require("./list");
const assoc_1 = require("./assoc");
describe('assoc', function () {
    it('contains_key', function () {
        // 0-1-many: base case, 0 recursive calls
        assert.deepStrictEqual((0, assoc_1.contains_key)("a", list_1.nil), false);
        assert.deepStrictEqual((0, assoc_1.contains_key)("b", list_1.nil), false);
        // 0-1-many: 1 recursive call
        const L0 = (0, list_1.cons)(["b", 2], list_1.nil);
        assert.deepStrictEqual((0, assoc_1.contains_key)("a", L0), false);
        assert.deepStrictEqual((0, assoc_1.contains_key)("b", L0), true);
        // 0-1-many: 2+ recursive calls
        const L1 = (0, list_1.cons)(["a", 1], (0, list_1.cons)(["b", 2], (0, list_1.cons)(["c", 3], list_1.nil)));
        const L2 = (0, list_1.cons)(["a", 4], (0, list_1.cons)(["b", 5], (0, list_1.cons)(["c", 6], (0, list_1.cons)(["d", 9], list_1.nil))));
        assert.deepStrictEqual((0, assoc_1.contains_key)("c", L1), true);
        assert.deepStrictEqual((0, assoc_1.contains_key)("d", L1), false);
        assert.deepStrictEqual((0, assoc_1.contains_key)("d", L2), true);
    });
    it('get_value', function () {
        const L1 = (0, list_1.cons)(["a", 1], (0, list_1.cons)(["b", 2], (0, list_1.cons)(["c", 3], list_1.nil)));
        const L2 = (0, list_1.cons)(["a", 4], (0, list_1.cons)(["b", 5], (0, list_1.cons)(["c", 6], (0, list_1.cons)(["d", 9], list_1.nil))));
        // 0-1-many: base case, 0 recursive calls
        assert.deepStrictEqual((0, assoc_1.get_value)("a", L1), 1);
        assert.deepStrictEqual((0, assoc_1.get_value)("a", L2), 4);
        // 0-1-many: 1 recursive call
        assert.deepStrictEqual((0, assoc_1.get_value)("b", L1), 2);
        assert.deepStrictEqual((0, assoc_1.get_value)("b", L2), 5);
        // 0-1-many: 2+ recursive calls
        assert.deepStrictEqual((0, assoc_1.get_value)("c", L1), 3);
        assert.deepStrictEqual((0, assoc_1.get_value)("d", L2), 9);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzb2NfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hc3NvY190ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBaUM7QUFDakMsaUNBQW1DO0FBQ25DLG1DQUE2RDtBQUc3RCxRQUFRLENBQUMsT0FBTyxFQUFFO0lBRWhCLEVBQUUsQ0FBQyxjQUFjLEVBQUU7UUFDakIseUNBQXlDO1FBQ3pDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBQSxvQkFBWSxFQUFDLEdBQUcsRUFBRSxVQUFHLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUEsb0JBQVksRUFBQyxHQUFHLEVBQUUsVUFBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdEQsNkJBQTZCO1FBQzdCLE1BQU0sRUFBRSxHQUFzQixJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFHLENBQUMsQ0FBQztRQUNsRCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUEsb0JBQVksRUFBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLG9CQUFZLEVBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3BELCtCQUErQjtRQUMvQixNQUFNLEVBQUUsR0FBc0IsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sRUFBRSxHQUFzQixJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRyxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUEsb0JBQVksRUFBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDcEQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLG9CQUFZLEVBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBQSxvQkFBWSxFQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0RCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxXQUFXLEVBQUU7UUFDZCxNQUFNLEVBQUUsR0FBc0IsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBQSxXQUFJLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsVUFBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xGLE1BQU0sRUFBRSxHQUFzQixJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFBLFdBQUksRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxVQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsRyx5Q0FBeUM7UUFDekMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5Qyw2QkFBNkI7UUFDN0IsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUM5QywrQkFBK0I7UUFDL0IsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLGlCQUFTLEVBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQzlDLE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBQSxpQkFBUyxFQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=