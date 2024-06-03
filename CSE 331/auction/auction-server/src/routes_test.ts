import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { addAuction, bidInAuction, getAuction, listAuctions,
         resetForTesting, advanceTimeForTesting } from './routes';

describe('routes', function() {

  it('add', function() {
    // Separate domain for each branch:
    // 1. Missing name
    const req1 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add', body: {}});
    const res1 = httpMocks.createResponse();
    addAuction(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(),
        "missing 'name' parameter");

    // 2. Missing seller
    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add', body: {name: "couch"}});
    const res2 = httpMocks.createResponse();
    addAuction(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(),
        "missing 'seller' parameter");

    // 3. Missing description
    const req3 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "couch", seller: "Fred"}});
    const res3 = httpMocks.createResponse();
    addAuction(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 400);
    assert.deepStrictEqual(res3._getData(),
        "missing 'description' parameter");

    // 4. Missing min-bid
    const req4 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "couch", seller: "Fred", description: "a couch"}});
    const res4 = httpMocks.createResponse();
    addAuction(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 400);
    assert.deepStrictEqual(res4._getData(),
        "'minBid' is not a number: undefined");

    // 5. Invalid min-bid
    const req5 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "couch", seller: "Fred", description: "a couch",
                minBid: -1}});
    const res5 = httpMocks.createResponse();
    addAuction(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 400);
    assert.deepStrictEqual(res5._getData(),
        "'minBid' is not a positive integer: -1");

    const req6 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "couch", seller: "Fred", description: "a couch",
                minBid: 2.5}});
    const res6 = httpMocks.createResponse();
    addAuction(req6, res6);
    assert.strictEqual(res6._getStatusCode(), 400);
    assert.deepStrictEqual(res6._getData(),
        "'minBid' is not a positive integer: 2.5");

    // 6. Missing minutes
    const req7 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "couch", seller: "Fred", description: "a couch",
                minBid: 7}});
    const res7 = httpMocks.createResponse();
    addAuction(req7, res7);
    assert.strictEqual(res7._getStatusCode(), 400);
    assert.deepStrictEqual(res7._getData(),
        "'minutes' is not a number: undefined");

    // 7. Invalid minutes
    const req8 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "couch", seller: "Fred", description: "a couch",
                minBid: 5, minutes: 0}});
    const res8 = httpMocks.createResponse();
    addAuction(req8, res8);
    assert.strictEqual(res8._getStatusCode(), 400);
    assert.deepStrictEqual(res8._getData(),
        "'minutes' is not a positive integer: 0");

    const req9 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "couch", seller: "Fred", description: "a couch",
                minBid: 2, minutes: 3.5}});
    const res9 = httpMocks.createResponse();
    addAuction(req9, res9);
    assert.strictEqual(res9._getStatusCode(), 400);
    assert.deepStrictEqual(res9._getData(),
        "'minutes' is not a positive integer: 3.5");

    // 8. Correctly added
    const req10 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "couch", seller: "Fred", description: "a couch",
                minBid: 2, minutes: 4}});
    const res10 = httpMocks.createResponse();
    addAuction(req10, res10);
    assert.strictEqual(res10._getStatusCode(), 200);
    assert.deepStrictEqual(res10._getData().auction.name, "couch");
    assert.deepStrictEqual(res10._getData().auction.seller, "Fred");
    assert.deepStrictEqual(res10._getData().auction.description, "a couch");
    assert.deepStrictEqual(res10._getData().auction.maxBid, 1);
    assert.deepStrictEqual(res10._getData().auction.maxBidder, "Fred");
    const endTime10 = res10._getData().auction.endTime;
    assert.ok(Math.abs(endTime10 - Date.now() - 4 * 60 * 1000) < 50);

    const req11 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "chair", seller: "Barney", description: "comfy chair",
                minBid: 3, minutes: 2}});
    const res11 = httpMocks.createResponse();
    addAuction(req11, res11);
    assert.strictEqual(res11._getStatusCode(), 200);
    assert.deepStrictEqual(res11._getData().auction.name, "chair");
    assert.deepStrictEqual(res11._getData().auction.seller, "Barney");
    assert.deepStrictEqual(res11._getData().auction.description, "comfy chair");
    assert.deepStrictEqual(res11._getData().auction.maxBid, 2);
    assert.deepStrictEqual(res11._getData().auction.maxBidder, "Barney");
    const endTime11 = res11._getData().auction.endTime;
    assert.ok(Math.abs(endTime11 - Date.now() - 2 * 60 * 1000) < 50);

    resetForTesting();
  });

  it('bid', function() {
    const req1 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "couch", seller: "Fred", description: "a couch",
                minBid: 10, minutes: 5}});
    const res1 = httpMocks.createResponse();
    addAuction(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData().auction.name, "couch");
    assert.deepStrictEqual(res1._getData().auction.maxBid, 9);

    // Separate domain for each branch:
    // 1. Missing bidder
    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/api/bid', body: {}});
    const res2 = httpMocks.createResponse();
    bidInAuction(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(),
        "missing or invalid 'bidder' parameter");

    // 2. Missing name
    const req3 = httpMocks.createRequest(
        {method: 'POST', url: '/api/bid', body: {bidder: "Barney"}});
    const res3 = httpMocks.createResponse();
    bidInAuction(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 400);
    assert.deepStrictEqual(res3._getData(),
        "missing or invalid 'name' parameter");

    // 3. Invalid name
    const req4 = httpMocks.createRequest(
        {method: 'POST', url: '/api/bid',
         body: {bidder: "Barney", name: "chair"}});
    const res4 = httpMocks.createResponse();
    bidInAuction(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 400);
    assert.deepStrictEqual(res4._getData(), "no auction with name 'chair'");

    const req5 = httpMocks.createRequest(
        {method: 'POST', url: '/api/bid',
         body: {bidder: "Barney", name: "stool"}});
    const res5 = httpMocks.createResponse();
    bidInAuction(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 400);
    assert.deepStrictEqual(res5._getData(), "no auction with name 'stool'");

    // 4. Amount missing
    const req6 = httpMocks.createRequest(
        {method: 'POST', url: '/api/bid',
         body: {bidder: "Barney", name: "couch"}});
    const res6 = httpMocks.createResponse();
    bidInAuction(req6, res6);
    assert.strictEqual(res6._getStatusCode(), 400);
    assert.deepStrictEqual(res6._getData(),
        "'amount' is not a number: undefined");

    // 5. Amount invalid
    const req7 = httpMocks.createRequest(
        {method: 'POST', url: '/api/bid',
         body: {bidder: "Barney", name: "couch", amount: -1}});
    const res7 = httpMocks.createResponse();
    bidInAuction(req7, res7);
    assert.strictEqual(res7._getStatusCode(), 400);
    assert.deepStrictEqual(res7._getData(),
        "'amount' is not a positive integer: -1");

    const req8 = httpMocks.createRequest(
        {method: 'POST', url: '/api/bid',
         body: {bidder: "Barney", name: "couch", amount: 2.5}});
    const res8 = httpMocks.createResponse();
    bidInAuction(req8, res8);
    assert.strictEqual(res8._getStatusCode(), 400);
    assert.deepStrictEqual(res8._getData(),
        "'amount' is not a positive integer: 2.5");

    // 6. Amount too small
    const req9 = httpMocks.createRequest(
        {method: 'POST', url: '/api/bid',
         body: {bidder: "Barney", name: "couch", amount: 3}});
    const res9 = httpMocks.createResponse();
    bidInAuction(req9, res9);
    assert.strictEqual(res9._getStatusCode(), 400);
    assert.deepStrictEqual(res9._getData(),
        "'amount' is not more than max bid: 3 <= 9");

    // 7. Bid made
    const req10 = httpMocks.createRequest(
        {method: 'POST', url: '/api/bid',
         body: {bidder: "Barney", name: "couch", amount: 10}});
    const res10 = httpMocks.createResponse();
    bidInAuction(req10, res10);
    assert.strictEqual(res10._getStatusCode(), 200);
    assert.deepStrictEqual(res10._getData().auction.name, "couch");
    assert.deepStrictEqual(res10._getData().auction.maxBid, 10);
    assert.deepStrictEqual(res10._getData().auction.maxBidder, "Barney");

    const req11 = httpMocks.createRequest(
        {method: 'POST', url: '/api/bid',
         body: {bidder: "Fred", name: "couch", amount: 15}});
    const res11 = httpMocks.createResponse();
    bidInAuction(req11, res11);
    assert.strictEqual(res11._getStatusCode(), 200);
    assert.deepStrictEqual(res11._getData().auction.name, "couch");
    assert.deepStrictEqual(res11._getData().auction.maxBid, 15);
    assert.deepStrictEqual(res11._getData().auction.maxBidder, "Fred");

    // Push time forward by over 5 minutes
    advanceTimeForTesting(5 * 60 * 1000 + 50);

    // 8. Auction over (advanceTimeForTesting) [separate test]
    const req12 = httpMocks.createRequest(
        {method: 'POST', url: '/api/bid',
         body: {bidder: "Barney", name: "couch", amount: 16}});
    const res12 = httpMocks.createResponse();
    bidInAuction(req12, res12);
    assert.strictEqual(res12._getStatusCode(), 400);
    assert.deepStrictEqual(res12._getData(),
        "auction for \"couch\" has already ended");

    resetForTesting();
  });

  it('get', function() {
    const req1 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "couch", seller: "Fred", description: "the cozy couch",
                minBid: 10, minutes: 5}});
    const res1 = httpMocks.createResponse();
    addAuction(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData().auction.name, "couch");
    assert.deepStrictEqual(res1._getData().auction.maxBid, 9);

    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "chair", seller: "Barney", description: "the comfy chair",
                minBid: 5, minutes: 10}});
    const res2 = httpMocks.createResponse();
    addAuction(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData().auction.name, "chair");
    assert.deepStrictEqual(res2._getData().auction.maxBid, 4);

    // Separate domain for each branch:
    // 1. Missing name
    // 1. Missing name
    const req3 = httpMocks.createRequest(
        {method: 'GET', url: '/api/get', query: {}});
    const res3 = httpMocks.createResponse();
    getAuction(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 400);
    assert.deepStrictEqual(res3._getData(), "missing 'name' parameter");

    // 2. Invalid name
    const req4 = httpMocks.createRequest(
        {method: 'GET', url: '/api/get', query: {name: "fridge"}});
    const res4 = httpMocks.createResponse();
    getAuction(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 400);
    assert.deepStrictEqual(res4._getData(), "no auction with name 'fridge'");

    const req5 = httpMocks.createRequest(
        {method: 'GET', url: '/api/get', query: {name: "stool"}});
    const res5 = httpMocks.createResponse();
    getAuction(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 400);
    assert.deepStrictEqual(res5._getData(), "no auction with name 'stool'");

    // 3. Auction found
    const req6 = httpMocks.createRequest(
        {method: 'GET', url: '/api/get', query: {name: "couch"}});
    const res6 = httpMocks.createResponse();
    getAuction(req6, res6);
    assert.strictEqual(res6._getStatusCode(), 200);
    assert.deepStrictEqual(res6._getData().auction.name, "couch");
    assert.deepStrictEqual(res6._getData().auction.maxBid, 9);
    assert.deepStrictEqual(res6._getData().auction.maxBidder, "Fred");

    const req7 = httpMocks.createRequest(
        {method: 'GET', url: '/api/get', query: {name: "chair"}});
    const res7 = httpMocks.createResponse();
    getAuction(req7, res7);
    assert.strictEqual(res7._getStatusCode(), 200);
    assert.deepStrictEqual(res7._getData().auction.name, "chair");
    assert.deepStrictEqual(res7._getData().auction.maxBid, 4);
    assert.deepStrictEqual(res7._getData().auction.maxBidder, "Barney");

    resetForTesting();
  });

  it('list', function() {
    const req1 = httpMocks.createRequest(
        {method: 'GET', url: '/api/list', query: {}});
    const res1 = httpMocks.createResponse();
    listAuctions(req1, res1);
    assert.strictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), {auctions: []});

    const req2 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "couch", seller: "Fred", description: "a couch",
                minBid: 10, minutes: 10}});
    const res2 = httpMocks.createResponse();
    addAuction(req2, res2);
    assert.strictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData().auction.name, "couch");
    assert.deepStrictEqual(res2._getData().auction.maxBid, 9);

    const req3 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "chair", seller: "Barney", description: "comfy couch",
                minBid: 5, minutes: 5}});
    const res3 = httpMocks.createResponse();
    addAuction(req3, res3);
    assert.strictEqual(res3._getStatusCode(), 200);
    assert.deepStrictEqual(res3._getData().auction.name, "chair");
    assert.deepStrictEqual(res3._getData().auction.maxBid, 4);

    const req4 = httpMocks.createRequest(
        {method: 'POST', url: '/api/add',
         body: {name: "stool", seller: "Kevin", description: "correctness stool",
                minBid: 15, minutes: 15}});
    const res4 = httpMocks.createResponse();
    addAuction(req4, res4);
    assert.strictEqual(res4._getStatusCode(), 200);
    assert.deepStrictEqual(res4._getData().auction.name, "stool");
    assert.deepStrictEqual(res4._getData().auction.maxBid, 14);

    // NOTE: chair goes first because it finishes sooner
    const req5 = httpMocks.createRequest(
        {method: 'GET', url: '/api/list', query: {}});
    const res5 = httpMocks.createResponse();
    listAuctions(req5, res5);
    assert.strictEqual(res5._getStatusCode(), 200);
    assert.deepStrictEqual(res5._getData().auctions.length, 3);
    assert.deepStrictEqual(res5._getData().auctions[0].name, "chair");
    assert.deepStrictEqual(res5._getData().auctions[1].name, "couch");
    assert.deepStrictEqual(res5._getData().auctions[2].name, "stool");

   // Push time forward by over 5 minutes
   advanceTimeForTesting(5 * 60 * 1000 + 50); 
         
   // NOTE: chair goes after because it has finished
   const req6 = httpMocks.createRequest(
       {method: 'GET', url: '/api/list', query: {}});
   const res6 = httpMocks.createResponse();
   listAuctions(req6, res6);
   assert.strictEqual(res6._getStatusCode(), 200);
   assert.deepStrictEqual(res6._getData().auctions.length, 3);
   assert.deepStrictEqual(res6._getData().auctions[0].name, "couch");
   assert.deepStrictEqual(res6._getData().auctions[1].name, "stool");
   assert.deepStrictEqual(res6._getData().auctions[2].name, "chair");
       
   // Push time forward by another 5 minutes
   advanceTimeForTesting(5 * 60 * 1000);
   
   // NOTE: chair stays after because it finished first
   const req7 = httpMocks.createRequest(
       {method: 'GET', url: '/api/list', query: {}});
   const res7 = httpMocks.createResponse();
   listAuctions(req7, res7);
   assert.strictEqual(res7._getStatusCode(), 200);
   assert.deepStrictEqual(res7._getData().auctions.length, 3);
   assert.deepStrictEqual(res7._getData().auctions[0].name, "stool");
   assert.deepStrictEqual(res7._getData().auctions[1].name, "couch");
   assert.deepStrictEqual(res7._getData().auctions[2].name, "chair");

   // Push time forward by another 20 minutes (all are completed)
   advanceTimeForTesting(20 * 60 * 1000);
   
   // NOTE: chair stays after because it finished first
   const req8 = httpMocks.createRequest(
       {method: 'GET', url: '/api/list', query: {}});
   const res8 = httpMocks.createResponse();
   listAuctions(req8, res8);
   assert.strictEqual(res8._getStatusCode(), 200);
   assert.deepStrictEqual(res8._getData().auctions.length, 3);
   assert.deepStrictEqual(res8._getData().auctions[0].name, "stool");
   assert.deepStrictEqual(res8._getData().auctions[1].name, "couch");
   assert.deepStrictEqual(res8._getData().auctions[2].name, "chair");

    resetForTesting();
  });

});
