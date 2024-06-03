import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { addGuest, listGuests, getGuest, clearGuests } from './routes';


describe('routes', function() {

  // TODO: remove the tests for the dummy route

  it('addGuest', function() {
    clearGuests();
    // error cases 1
    // missing name
    const req1 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {} });
    const res1 = httpMocks.createResponse();
    addGuest(req1, res1);
  
    assert.deepStrictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(), "missing 'name' parameter");

    const req2 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: 12} });
    const res2 = httpMocks.createResponse();
    addGuest(req2, res2);
  
    assert.deepStrictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(), "missing 'name' parameter");

    // missing guestOf
    const req3 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "a"} });
    const res3 = httpMocks.createResponse();
    addGuest(req3, res3);
  
    assert.deepStrictEqual(res3._getStatusCode(), 400);
    assert.deepStrictEqual(res3._getData(), "missing 'guestOf' parameter");
    
    const req4 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "b"} });
    const res4 = httpMocks.createResponse();
    addGuest(req4, res4);
  
    assert.deepStrictEqual(res4._getStatusCode(), 400);
    assert.deepStrictEqual(res4._getData(), "missing 'guestOf' parameter");

    // missing family
    const req5 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "a", guestOf: "Molly"} });
    const res5 = httpMocks.createResponse();
    addGuest(req5, res5);

    assert.deepStrictEqual(res5._getStatusCode(), 400);
    assert.deepStrictEqual(res5._getData(), "missing 'family' parameter");

    const req6 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "b", guestOf: "James"} });
    const res6 = httpMocks.createResponse();
    addGuest(req6, res6);

    assert.deepStrictEqual(res6._getStatusCode(), 400);
    assert.deepStrictEqual(res6._getData(), "missing 'family' parameter");

    // success cases 1
    // guest does not exist in the list - dietRestrictions is undefined (first time doing addGuest)
    const req7 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "a", guestOf: "Molly", family: true} });
    const res7 = httpMocks.createResponse();
    addGuest(req7, res7);

    assert.deepStrictEqual(res7._getStatusCode(), 200);
    assert.deepStrictEqual(res7._getData(), {guest: {name: "a", guestOf: "Molly", family: true}});

    const req8 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "b", guestOf: "James", family: false} });
    const res8 = httpMocks.createResponse();
    addGuest(req8, res8);

    assert.deepStrictEqual(res8._getStatusCode(), 200);
    assert.deepStrictEqual(res8._getData(), {guest: {name: "b", guestOf: "James", family: false}});

    // error cases 2
    // guest exists - dietRestrictions must be defined, but isn't or isn't a string (second time doing addGuest - doing Guest details)
    const req9 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "a", guestOf: "Molly", family: true} });
    const res9 = httpMocks.createResponse();
    addGuest(req9, res9);

    assert.deepStrictEqual(res9._getStatusCode(), 400);
    assert.deepStrictEqual(res9._getData(), "missing 'dietRestrictions' parameter");

    const req10 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "b", guestOf: "James", family: false, dietRestrictions: 23} });
    const res10 = httpMocks.createResponse();
    addGuest(req10, res10);

    assert.deepStrictEqual(res10._getStatusCode(), 400);
    assert.deepStrictEqual(res10._getData(), "missing 'dietRestrictions' parameter");

    // success cases 2
    // guest exists - dietRestrictions is defined and is a string (second time doing addGuest - doing Guest details)
    const req11 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none"} });
    const res11 = httpMocks.createResponse();
    addGuest(req11, res11);

    assert.deepStrictEqual(res11._getStatusCode(), 200);
    assert.deepStrictEqual(res11._getData(), {guest: {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none"}});

    const req12 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "b", guestOf: "James", family: false, dietRestrictions: "vegan"} });
    const res12 = httpMocks.createResponse();
    addGuest(req12, res12);

    assert.deepStrictEqual(res12._getStatusCode(), 200);
    assert.deepStrictEqual(res12._getData(), {guest: {name: "b", guestOf: "James", family: false, dietRestrictions: "vegan"}});

    // error cases 3
    // guest exists - hasPlusOne is defined but not a 0 or 1 (second or more time doing addGuest - doing Guest details)
    const req13 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 2} });
    const res13 = httpMocks.createResponse();
    addGuest(req13, res13);

    assert.deepStrictEqual(res13._getStatusCode(), 400);
    assert.deepStrictEqual(res13._getData(), "hasPlusOne is not an appropriate number");

    const req14 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: -1} });
    const res14 = httpMocks.createResponse();
    addGuest(req14, res14);

    assert.deepStrictEqual(res14._getStatusCode(), 400);
    assert.deepStrictEqual(res14._getData(), "hasPlusOne is not an appropriate number");

    // guest exists - hasPlusOne is 1 but plusOneName is missing (second or more time doing addGuest - doing Guest details)
    const req15 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1} });
    const res15 = httpMocks.createResponse();
    addGuest(req15, res15);

    assert.deepStrictEqual(res15._getStatusCode(), 400);
    assert.deepStrictEqual(res15._getData(), "missing 'plusOneName' parameter");

    const req16 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: 1, plusOneName: 12} });
    const res16 = httpMocks.createResponse();
    addGuest(req16, res16);

    assert.deepStrictEqual(res16._getStatusCode(), 400);
    assert.deepStrictEqual(res16._getData(), "missing 'plusOneName' parameter");

    // guest exists - hasPlusOne is 1 but plusOneDietRest is missing (second or more time doing addGuest - doing Guest details)
    const req17 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1, plusOneName: "Alice"} });
    const res17 = httpMocks.createResponse();
    addGuest(req17, res17);

    assert.deepStrictEqual(res17._getStatusCode(), 400);
    assert.deepStrictEqual(res17._getData(), "missing 'plusOneDietRest parameter");

    const req18 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: 1, plusOneName: "Bob", plusOneDietRest: 12} });
    const res18 = httpMocks.createResponse();
    addGuest(req18, res18);

    assert.deepStrictEqual(res18._getStatusCode(), 400);
    assert.deepStrictEqual(res18._getData(), "missing 'plusOneDietRest parameter");

    // success cases 3
    // guest exists - hasPlusOne is 1 and plusOneName and plusOneDietRest are defined and are strings (second or more time doing addGuest - doing Guest details)
    const req19 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1, plusOneName: "Alice", plusOneDietRest: "none"} });
    const res19 = httpMocks.createResponse();
    addGuest(req19, res19);

    assert.deepStrictEqual(res19._getStatusCode(), 200);
    assert.deepStrictEqual(res19._getData(), {guest: {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1, plusOneName: "Alice", plusOneDietRest: "none"}});

    const req20 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: {name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: 1, plusOneName: "Bob", plusOneDietRest: "vegan"} });
    const res20 = httpMocks.createResponse();
    addGuest(req20, res20);

    assert.deepStrictEqual(res20._getStatusCode(), 200);
    assert.deepStrictEqual(res20._getData(), {guest: {name: "b", guestOf: "James", family: false, dietRestrictions: "vegan", hasPlusOne: 1, plusOneName: "Bob", plusOneDietRest: "vegan"}});

    clearGuests();
  });

  it('listGuests', function() {
    clearGuests();
    // empty list
    const req1 = httpMocks.createRequest({method: 'GET', url: '/api/list'});
    const res1 = httpMocks.createResponse();
    listGuests(req1, res1);

    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), {guests: []});
  
    // list with one guest - first time adding guest
    const g1 = {name: "a", guestOf: "Molly", family: true};
    const aReq1 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: g1 });
    const aRes1 = httpMocks.createResponse();
    addGuest(aReq1, aRes1);

    const req2 = httpMocks.createRequest({method: 'GET', url: '/api/list'});
    const res2 = httpMocks.createResponse();
    listGuests(req2, res2);

    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(), {guests: [g1]});

    // list with one guest - second time adding guest (adding details)
    const g2 = {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1, plusOneName: "Alice", plusOneDietRest: "none"};

    const aReq2 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: g2 });
    const aRes2 = httpMocks.createResponse();
    addGuest(aReq2, aRes2);

    const req3 = httpMocks.createRequest({method: 'GET', url: '/api/list'});
    const res3 = httpMocks.createResponse();
    listGuests(req3, res3);

    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepStrictEqual(res3._getData(), {guests: [g2]});

    // list with multiple guests
    const g3 = {name: "b", guestOf: "James", family: false};
    const aReq3 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: g3 });
    const aRes3 = httpMocks.createResponse();
    addGuest(aReq3, aRes3);

    const req4 = httpMocks.createRequest({method: 'GET', url: '/api/list'});
    const res4 = httpMocks.createResponse();
    listGuests(req4, res4);

    assert.strictEqual(res4._getStatusCode(), 200);
    assert.deepStrictEqual(res4._getData(), {guests: [g2, g3]});

    clearGuests();
  });
  
  it('getGuest', function() {
    clearGuests();
    // error cases
    // guest does not have an appropriate name
    const req1 = httpMocks.createRequest({method: 'GET', url: '/api/get', query: {} });
    const res1 = httpMocks.createResponse();
    getGuest(req1, res1);

    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(), "missing 'name' parameter");

    const req2 = httpMocks.createRequest({method: 'GET', url: '/api/get', query: {name: 12} });
    const res2 = httpMocks.createResponse();
    getGuest(req2, res2);

    assert.strictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(), "missing 'name' parameter");

    // guest does not exist in the list
    const req3 = httpMocks.createRequest({method: 'GET', url: '/api/get', query: {name: "a"} });
    const res3 = httpMocks.createResponse();
    getGuest(req3, res3);

    assert.strictEqual(res3._getStatusCode(), 400);
    assert.deepStrictEqual(res3._getData(), "guest with name: 'a' does not exist");

    const req4 = httpMocks.createRequest({method: 'GET', url: '/api/get', query: {name: "b"} });
    const res4 = httpMocks.createResponse();
    getGuest(req4, res4);

    assert.strictEqual(res4._getStatusCode(), 400);
    assert.deepStrictEqual(res4._getData(), "guest with name: 'b' does not exist");

    // success cases
    // guest exists in the list - first time adding guest
    const g1 = {name: "a", guestOf: "Molly", family: true};
    const aReq1 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: g1 });
    const aRes1 = httpMocks.createResponse();
    addGuest(aReq1, aRes1);

    const req5 = httpMocks.createRequest({method: 'GET', url: '/api/get', query: {name: "a"} });
    const res5 = httpMocks.createResponse();
    getGuest(req5, res5);

    assert.strictEqual(res5._getStatusCode(), 200);
    assert.deepStrictEqual(res5._getData(), {guest: g1});

    // guest exists in the list - second time adding guest (adding details)
    const g2 = {name: "a", guestOf: "Molly", family: true, dietRestrictions: "none", hasPlusOne: 1, plusOneName: "Alice", plusOneDietRest: "none"};
    const aReq2 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: g2 });
    const aRes2 = httpMocks.createResponse();
    addGuest(aReq2, aRes2);

    const req6 = httpMocks.createRequest({method: 'GET', url: '/api/get', query: {name: "a"} });
    const res6 = httpMocks.createResponse();
    getGuest(req6, res6);

    assert.strictEqual(res6._getStatusCode(), 200);
    assert.deepStrictEqual(res6._getData(), {guest: g2});

    // multiple guests in the list
    const g3 = {name: "b", guestOf: "James", family: false};
    const aReq3 = httpMocks.createRequest({method: 'POST', url: '/api/add', body: g3 });
    const aRes3 = httpMocks.createResponse();
    addGuest(aReq3, aRes3);

    const req7 = httpMocks.createRequest({method: 'GET', url: '/api/get', query: {name: "b"} });
    const res7 = httpMocks.createResponse();
    getGuest(req7, res7);

    assert.strictEqual(res7._getStatusCode(), 200);
    assert.deepStrictEqual(res7._getData(), {guest: g3});
    clearGuests();
  });

});
