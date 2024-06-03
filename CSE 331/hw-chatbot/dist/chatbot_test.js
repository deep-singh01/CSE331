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
const chatbot_1 = require("./chatbot");
describe('chatbot', function () {
    it('matchPattern', function () {
        const words1 = ['a', 'b', 'c', 'd'];
        assert.deepStrictEqual((0, chatbot_1.matchPattern)(words1, [['b', 'e']]), undefined);
        assert.deepStrictEqual((0, chatbot_1.matchPattern)(words1, [['b', 'c']]), [['a'], ['d']]);
        assert.deepStrictEqual((0, chatbot_1.matchPattern)(words1, [['a', 'b']]), [[], ['c', 'd']]);
        assert.deepStrictEqual((0, chatbot_1.matchPattern)(words1, [['c', 'd']]), [['a', 'b'], []]);
        const words2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
        assert.deepStrictEqual((0, chatbot_1.matchPattern)(words2, [['b', 'c'], ['e', 'z']]), undefined);
        assert.deepStrictEqual((0, chatbot_1.matchPattern)(words2, [['b', 'c'], ['e', 'f']]), [['a'], ['d'], ['g']]);
        assert.deepStrictEqual((0, chatbot_1.matchPattern)(words2, [['b', 'c'], ['d', 'e']]), [['a'], [], ['f', 'g']]);
        assert.deepStrictEqual((0, chatbot_1.matchPattern)(words2, [['a', 'b'], ['f', 'g']]), [[], ['c', 'd', 'e'], []]);
        const words3 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
        assert.deepStrictEqual((0, chatbot_1.matchPattern)(words3, [['b', 'c'], ['e', 'f'], ['h', 'z']]), undefined);
        assert.deepStrictEqual((0, chatbot_1.matchPattern)(words3, [['b', 'c'], ['e', 'f'], ['h', 'i']]), [['a'], ['d'], ['g'], ['j']]);
        assert.deepStrictEqual((0, chatbot_1.matchPattern)(words3, [['b', 'c'], ['e', 'f'], ['i', 'j']]), [['a'], ['d'], ['g', 'h'], []]);
        assert.deepStrictEqual((0, chatbot_1.matchPattern)(words3, [['b', 'c'], ['e', 'f'], ['g', 'h']]), [['a'], ['d'], [], ['i', 'j']]);
        (0, chatbot_1.clearLastUsedForTesting)();
    });
    const PATTERNS = [
        { name: "foo",
            contains: [['foo']],
            responses: [
                ['why', 0, 'and', 'not', 1],
                [0, ',', 'is', 'that', 'so?'],
            ] },
        { name: "my",
            contains: [['my']],
            responses: [['talk', 'more', 'about', 'your', 1]] },
        { name: "bar",
            contains: [['bar']],
            responses: [['what', 'about', 1, '?']] }
    ];
    it('applyPattern', function () {
        assert.deepStrictEqual((0, chatbot_1.applyPattern)(PATTERNS[0], [['arg0'], ['arg1']]), ['why', 'arg0', 'and', 'not', 'arg1']);
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("foo"), "0");
        assert.deepStrictEqual((0, chatbot_1.applyPattern)(PATTERNS[0], [['arg0'], ['arg1']]), ['arg0', ',', 'is', 'that', 'so?']);
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("foo"), "1");
        assert.deepStrictEqual((0, chatbot_1.applyPattern)(PATTERNS[0], [['A'], ['B']]), ['why', 'A', 'and', 'not', 'B']);
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("foo"), "0");
        assert.deepStrictEqual((0, chatbot_1.applyPattern)(PATTERNS[2], [['arg0'], ['arg1']]), ['what', 'about', 'arg1', '?']);
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("foo"), "0");
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("bar"), "0");
        (0, chatbot_1.clearLastUsedForTesting)();
    });
    it('chatResponse', function () {
        const memory = [];
        assert.deepStrictEqual((0, chatbot_1.chatResponse)(['arg0', 'my', 'foo', 'arg1'], memory, PATTERNS), ['why', 'arg0', 'your', 'and', 'not', 'arg1']);
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("foo"), "0");
        assert.deepStrictEqual(memory.length, 0);
        assert.deepStrictEqual((0, chatbot_1.chatResponse)(['arg2', 'my', 'bar', 'arg3'], memory, PATTERNS), ['what', 'about', 'arg3', '?']);
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("bar"), "0");
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("foo"), "0");
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("my"), "0");
        assert.deepStrictEqual(memory.length, 1);
        assert.deepStrictEqual((0, chatbot_1.chatResponse)(['arg4', 'foo', 'arg5'], memory, PATTERNS), ['arg4', ',', 'is', 'that', 'so?']);
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("bar"), "0");
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("foo"), "1");
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("my"), "0");
        assert.deepStrictEqual(memory.length, 1);
        assert.deepStrictEqual((0, chatbot_1.chatResponse)(['arg5', 'baz', 'arg6'], memory, PATTERNS), ['talk', 'more', 'about', 'your', 'bar', 'arg3']);
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("bar"), "0");
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("foo"), "1");
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("my"), "0");
        assert.deepStrictEqual(memory.length, 0);
        assert.deepStrictEqual((0, chatbot_1.chatResponse)(['arg2', 'baz', 'arg3'], memory, PATTERNS), ["I'm", "not", "sure", "I", "understand", "you", "fully", "."]);
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)(".none"), "0");
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("bar"), "0");
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("foo"), "1");
        assert.deepStrictEqual((0, chatbot_1.getInLastUsedForTesting)("my"), "0");
        assert.deepStrictEqual(memory.length, 0);
        (0, chatbot_1.clearLastUsedForTesting)();
    });
    it('assemble', function () {
        assert.deepStrictEqual((0, chatbot_1.assemble)([], [['a'], ['b']]), []);
        assert.deepStrictEqual((0, chatbot_1.assemble)(['foo'], [['a'], ['b']]), ['foo']);
        assert.deepStrictEqual((0, chatbot_1.assemble)([0], [['a'], ['b', 'c']]), ['a']);
        assert.deepStrictEqual((0, chatbot_1.assemble)([1], [['a'], ['b', 'c']]), ['b', 'c']);
        assert.deepStrictEqual((0, chatbot_1.assemble)(['d', 0], [['a'], ['b', 'c']]), ['d', 'a']);
        assert.deepStrictEqual((0, chatbot_1.assemble)(['d', 1], [['a'], ['b', 'c']]), ['d', 'b', 'c']);
        assert.deepStrictEqual((0, chatbot_1.assemble)(['d', 0, 'e'], [['a'], ['b', 'c']]), ['d', 'a', 'e']);
        assert.deepStrictEqual((0, chatbot_1.assemble)(['d', 1, 'e'], [['a'], ['b', 'c']]), ['d', 'b', 'c', 'e']);
        assert.deepStrictEqual((0, chatbot_1.assemble)(['the', 'quick', 1, 2, 'jumped', 'over', 'the', 'lazy', 0], [['dog'], ['brown'], ['fox']]), ['the', 'quick', 'brown', 'fox', 'jumped', 'over', 'the', 'lazy', 'dog']);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdGJvdF90ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NoYXRib3RfdGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsK0NBQWlDO0FBRWpDLHVDQUFpSTtBQUVqSSxRQUFRLENBQUMsU0FBUyxFQUFFO0lBRWxCLEVBQUUsQ0FBQyxjQUFjLEVBQUU7UUFDakIsTUFBTSxNQUFNLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxNQUFNLENBQUMsZUFBZSxDQUNsQixJQUFBLHNCQUFZLEVBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ25ELE1BQU0sQ0FBQyxlQUFlLENBQ2xCLElBQUEsc0JBQVksRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hELE1BQU0sQ0FBQyxlQUFlLENBQ2xCLElBQUEsc0JBQVksRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFELE1BQU0sQ0FBQyxlQUFlLENBQ2xCLElBQUEsc0JBQVksRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRTFELE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkQsTUFBTSxDQUFDLGVBQWUsQ0FDbEIsSUFBQSxzQkFBWSxFQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsZUFBZSxDQUNsQixJQUFBLHNCQUFZLEVBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNFLE1BQU0sQ0FBQyxlQUFlLENBQ2xCLElBQUEsc0JBQVksRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDN0UsTUFBTSxDQUFDLGVBQWUsQ0FDbEIsSUFBQSxzQkFBWSxFQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUvRSxNQUFNLE1BQU0sR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxlQUFlLENBQ2xCLElBQUEsc0JBQVksRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDM0UsTUFBTSxDQUFDLGVBQWUsQ0FDbEIsSUFBQSxzQkFBWSxFQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDMUQsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNsQyxNQUFNLENBQUMsZUFBZSxDQUNsQixJQUFBLHNCQUFZLEVBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUMxRCxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BDLE1BQU0sQ0FBQyxlQUFlLENBQ2xCLElBQUEsc0JBQVksRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQzFELENBQUMsQ0FBQyxHQUFHLENB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QUM7UUFDbkUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFBLGtCQUFRLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNsRSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUEsa0JBQVEsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUN2RSxNQUFNLENBQUMsZUFBZSxDQUNsQixJQUFBLGtCQUFRLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pELE1BQU0sQ0FBQyxlQUFlLENBQ2xCLElBQUEsa0JBQVEsRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxlQUFlLENBQ2xCLElBQUEsa0JBQVEsRUFBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNuRSxNQUFNLENBQUMsZUFBZSxDQUNsQixJQUFBLGtCQUFRLEVBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3hFLE1BQU0sQ0FBQyxlQUFlLENBQ2xCLElBQUEsa0JBQVEsRUFDSixDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQzFELENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUNsQyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztJQUNoRixDQUFDLENBQUMsQ0FBQztBQUVMLENBQUMsQ0FBQyxDQUFDIn0=