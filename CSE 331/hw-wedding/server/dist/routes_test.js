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
const httpMocks = __importStar(require("node-mocks-http"));
const routes_1 = require("./routes");
describe('routes', function () {
    // TODO: remove the tests for the dummy route
    it('addGuest', function () {
        (0, routes_1.clearGuests)();
        // error cases 1
        // missing name
        const req1 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: {} });
        const res1 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req1, res1);
        assert.deepStrictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), "missing 'name' parameter");
        const req2 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: 12 } });
        const res2 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req2, res2);
        assert.deepStrictEqual(res2._getStatusCode(), 400);
        assert.deepStrictEqual(res2._getData(), "missing 'name' parameter");
        // missing guestOf
        const req3 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "a" } });
        const res3 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req3, res3);
        assert.deepStrictEqual(res3._getStatusCode(), 400);
        assert.deepStrictEqual(res3._getData(), "missing 'guestOf' parameter");
        const req4 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "b" } });
        const res4 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req4, res4);
        assert.deepStrictEqual(res4._getStatusCode(), 400);
        assert.deepStrictEqual(res4._getData(), "missing 'guestOf' parameter");
        // missing family
        const req5 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "a", guestOf: "Molly" } });
        const res5 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req5, res5);
        assert.deepStrictEqual(res5._getStatusCode(), 400);
        assert.deepStrictEqual(res5._getData(), "missing 'family' parameter");
        const req6 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "b", guestOf: "James" } });
        const res6 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req6, res6);
        assert.deepStrictEqual(res6._getStatusCode(), 400);
        assert.deepStrictEqual(res6._getData(), "missing 'family' parameter");
        // success cases 1
        // guest does not exist in the list - dietRestrictions is undefined (first time doing addGuest)
        const req7 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "a", guestOf: "Molly", family: true } });
        const res7 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req7, res7);
        assert.deepStrictEqual(res7._getStatusCode(), 200);
        assert.deepStrictEqual(res7._getData(), { guest: { name: "a", guestOf: "Molly", family: true } });
        const req8 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "b", guestOf: "James", family: false } });
        const res8 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req8, res8);
        assert.deepStrictEqual(res8._getStatusCode(), 200);
        assert.deepStrictEqual(res8._getData(), { guest: { name: "b", guestOf: "James", family: false } });
        // error cases 2
        // guest exists - dietRestrictions must be defined, but isn't or isn't a string (second time doing addGuest - doing Guest details)
        const req9 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "a", guestOf: "Molly", family: true } });
        const res9 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req9, res9);
        assert.deepStrictEqual(res9._getStatusCode(), 400);
        assert.deepStrictEqual(res9._getData(), "missing 'dietRestrictions' parameter");
        const req10 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "b", guestOf: "James", family: false, dietRestrictions: 23 } });
        const res10 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req10, res10);
        assert.deepStrictEqual(res10._getStatusCode(), 400);
        assert.deepStrictEqual(res10._getData(), "missing 'dietRestrictions' parameter");
        // success cases 2
        // guest exists - dietRestrictions is defined and is a string (second time doing addGuest - doing Guest details)
        const req11 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "a", guestOf: "Molly", family: true, dietRestrictions: "none" } });
        const res11 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req11, res11);
        assert.deepStrictEqual(res11._getStatusCode(), 200);
        assert.deepStrictEqual(res11._getData(), { guest: { name: "a", guestOf: "Molly", family: true, dietRestrictions: "none" } });
        const req12 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "b", guestOf: "James", family: false, dietRestrictions: "vegan" } });
        const res12 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req12, res12);
        assert.deepStrictEqual(res12._getStatusCode(), 200);
        assert.deepStrictEqual(res12._getData(), { guest: { name: "b", guestOf: "James", family: false, dietRestrictions: "vegan" } });
        // error cases 3
        // guest exists - hasPlusOne is defined but not a 0 or 1 (second or more time doing addGuest - doing Guest details)
        const req13 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 2 } });
        const res13 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req13, res13);
        assert.deepStrictEqual(res13._getStatusCode(), 400);
        assert.deepStrictEqual(res13._getData(), "hasPlusOne is not an appropriate number");
        const req14 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: -1 } });
        const res14 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req14, res14);
        assert.deepStrictEqual(res14._getStatusCode(), 400);
        assert.deepStrictEqual(res14._getData(), "hasPlusOne is not an appropriate number");
        // guest exists - hasPlusOne is 1 but plusOneName is missing (second or more time doing addGuest - doing Guest details)
        const req15 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1 } });
        const res15 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req15, res15);
        assert.deepStrictEqual(res15._getStatusCode(), 400);
        assert.deepStrictEqual(res15._getData(), "missing 'plusOneName' parameter");
        const req16 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: 1, plusOneName: 12 } });
        const res16 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req16, res16);
        assert.deepStrictEqual(res16._getStatusCode(), 400);
        assert.deepStrictEqual(res16._getData(), "missing 'plusOneName' parameter");
        // guest exists - hasPlusOne is 1 but plusOneDietRest is missing (second or more time doing addGuest - doing Guest details)
        const req17 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1, plusOneName: "Alice" } });
        const res17 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req17, res17);
        assert.deepStrictEqual(res17._getStatusCode(), 400);
        assert.deepStrictEqual(res17._getData(), "missing 'plusOneDietRest parameter");
        const req18 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: 1, plusOneName: "Bob", plusOneDietRest: 12 } });
        const res18 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req18, res18);
        assert.deepStrictEqual(res18._getStatusCode(), 400);
        assert.deepStrictEqual(res18._getData(), "missing 'plusOneDietRest parameter");
        // success cases 3
        // guest exists - hasPlusOne is 1 and plusOneName and plusOneDietRest are defined and are strings (second or more time doing addGuest - doing Guest details)
        const req19 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1, plusOneName: "Alice", plusOneDietRest: "none" } });
        const res19 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req19, res19);
        assert.deepStrictEqual(res19._getStatusCode(), 200);
        assert.deepStrictEqual(res19._getData(), { guest: { name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1, plusOneName: "Alice", plusOneDietRest: "none" } });
        const req20 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: { name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: 1, plusOneName: "Bob", plusOneDietRest: "vegan" } });
        const res20 = httpMocks.createResponse();
        (0, routes_1.addGuest)(req20, res20);
        assert.deepStrictEqual(res20._getStatusCode(), 200);
        assert.deepStrictEqual(res20._getData(), { guest: { name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: 1, plusOneName: "Bob", plusOneDietRest: "vegan" } });
        (0, routes_1.clearGuests)();
    });
    it('listGuests', function () {
        (0, routes_1.clearGuests)();
        // empty list
        const req1 = httpMocks.createRequest({ method: 'GET', url: '/api/list' });
        const res1 = httpMocks.createResponse();
        (0, routes_1.listGuests)(req1, res1);
        assert.strictEqual(res1._getStatusCode(), 200);
        assert.deepStrictEqual(res1._getData(), { guests: [] });
        // list with one guest - first time adding guest
        const g1 = { name: "a", guestOf: "Molly", family: true };
        const aReq1 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: g1 });
        const aRes1 = httpMocks.createResponse();
        (0, routes_1.addGuest)(aReq1, aRes1);
        const req2 = httpMocks.createRequest({ method: 'GET', url: '/api/list' });
        const res2 = httpMocks.createResponse();
        (0, routes_1.listGuests)(req2, res2);
        assert.strictEqual(res2._getStatusCode(), 200);
        assert.deepStrictEqual(res2._getData(), { guests: [g1] });
        // list with one guest - second time adding guest (adding details)
        const g2 = { name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1, plusOneName: "Alice", plusOneDietRest: "none" };
        const aReq2 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: g2 });
        const aRes2 = httpMocks.createResponse();
        (0, routes_1.addGuest)(aReq2, aRes2);
        const req3 = httpMocks.createRequest({ method: 'GET', url: '/api/list' });
        const res3 = httpMocks.createResponse();
        (0, routes_1.listGuests)(req3, res3);
        assert.strictEqual(res3._getStatusCode(), 200);
        assert.deepStrictEqual(res3._getData(), { guests: [g2] });
        // list with multiple guests
        const g3 = { name: "b", guestOf: "James", family: false };
        const aReq3 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: g3 });
        const aRes3 = httpMocks.createResponse();
        (0, routes_1.addGuest)(aReq3, aRes3);
        const req4 = httpMocks.createRequest({ method: 'GET', url: '/api/list' });
        const res4 = httpMocks.createResponse();
        (0, routes_1.listGuests)(req4, res4);
        assert.strictEqual(res4._getStatusCode(), 200);
        assert.deepStrictEqual(res4._getData(), { guests: [g2, g3] });
        (0, routes_1.clearGuests)();
    });
    it('getGuest', function () {
        (0, routes_1.clearGuests)();
        // error cases
        // guest does not have an appropriate name
        const req1 = httpMocks.createRequest({ method: 'GET', url: '/api/get', query: {} });
        const res1 = httpMocks.createResponse();
        (0, routes_1.getGuest)(req1, res1);
        assert.strictEqual(res1._getStatusCode(), 400);
        assert.deepStrictEqual(res1._getData(), "missing 'name' parameter");
        const req2 = httpMocks.createRequest({ method: 'GET', url: '/api/get', query: { name: 12 } });
        const res2 = httpMocks.createResponse();
        (0, routes_1.getGuest)(req2, res2);
        assert.strictEqual(res2._getStatusCode(), 400);
        assert.deepStrictEqual(res2._getData(), "missing 'name' parameter");
        // guest does not exist in the list
        const req3 = httpMocks.createRequest({ method: 'GET', url: '/api/get', query: { name: "a" } });
        const res3 = httpMocks.createResponse();
        (0, routes_1.getGuest)(req3, res3);
        assert.strictEqual(res3._getStatusCode(), 400);
        assert.deepStrictEqual(res3._getData(), "guest with name: 'a' does not exist");
        const req4 = httpMocks.createRequest({ method: 'GET', url: '/api/get', query: { name: "b" } });
        const res4 = httpMocks.createResponse();
        (0, routes_1.getGuest)(req4, res4);
        assert.strictEqual(res4._getStatusCode(), 400);
        assert.deepStrictEqual(res4._getData(), "guest with name: 'b' does not exist");
        // success cases
        // guest exists in the list - first time adding guest
        const g1 = { name: "a", guestOf: "Molly", family: true };
        const aReq1 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: g1 });
        const aRes1 = httpMocks.createResponse();
        (0, routes_1.addGuest)(aReq1, aRes1);
        const req5 = httpMocks.createRequest({ method: 'GET', url: '/api/get', query: { name: "a" } });
        const res5 = httpMocks.createResponse();
        (0, routes_1.getGuest)(req5, res5);
        assert.strictEqual(res5._getStatusCode(), 200);
        assert.deepStrictEqual(res5._getData(), { guest: g1 });
        // guest exists in the list - second time adding guest (adding details)
        const g2 = { name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1, plusOneName: "Alice", plusOneDietRest: "none" };
        const aReq2 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: g2 });
        const aRes2 = httpMocks.createResponse();
        (0, routes_1.addGuest)(aReq2, aRes2);
        const req6 = httpMocks.createRequest({ method: 'GET', url: '/api/get', query: { name: "a" } });
        const res6 = httpMocks.createResponse();
        (0, routes_1.getGuest)(req6, res6);
        assert.strictEqual(res6._getStatusCode(), 200);
        assert.deepStrictEqual(res6._getData(), { guest: g2 });
        // multiple guests in the list
        const g3 = { name: "b", guestOf: "James", family: false };
        const aReq3 = httpMocks.createRequest({ method: 'POST', url: '/api/add', body: g3 });
        const aRes3 = httpMocks.createResponse();
        (0, routes_1.addGuest)(aReq3, aRes3);
        const req7 = httpMocks.createRequest({ method: 'GET', url: '/api/get', query: { name: "b" } });
        const res7 = httpMocks.createResponse();
        (0, routes_1.getGuest)(req7, res7);
        assert.strictEqual(res7._getStatusCode(), 200);
        assert.deepStrictEqual(res7._getData(), { guest: g3 });
        (0, routes_1.clearGuests)();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzX3Rlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcm91dGVzX3Rlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLCtDQUFpQztBQUNqQywyREFBNkM7QUFDN0MscUNBQXVFO0FBR3ZFLFFBQVEsQ0FBQyxRQUFRLEVBQUU7SUFFakIsNkNBQTZDO0lBRTdDLEVBQUUsQ0FBQyxVQUFVLEVBQUU7UUFDYixJQUFBLG9CQUFXLEdBQUUsQ0FBQztRQUNkLGdCQUFnQjtRQUNoQixlQUFlO1FBQ2YsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuRixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxpQkFBUSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVyQixNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuRCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1FBRXBFLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxhQUFhLENBQUMsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLEVBQUUsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUMzRixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEMsSUFBQSxpQkFBUSxFQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUVyQixNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFj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