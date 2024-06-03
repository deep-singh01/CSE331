import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { dummy, load, names, save, clearFiles } from './routes';


describe('routes', function() {

  // After you know what to do, feel free to delete this Dummy test
  it('dummy', function() {
    // You can copy this test structure to start your own tests, these comments
    // are included as a reminder of how testing routes works:

    // httpMocks lets us create mock Request and Response params to pass into our route functions
    const req1 = httpMocks.createRequest(
        // query: is how we add query params. body: {} can be used to test a POST request
        {method: 'GET', url: '/api/dummy', query: {name: 'Zach'}}); 
    const res1 = httpMocks.createResponse();
    // call our function to execute the request and fill in the response
    dummy(req1, res1);
    // check that the request was successful
    assert.deepStrictEqual(res1._getStatusCode(), 200);
    // and the response data is as expected
    assert.deepStrictEqual(res1._getData(), {greeting: 'Hi, Zach'});
  });


  // TODO: add tests for your routes
  it('save', function() {
    clearFiles();
    // First branch, straight line code, error case
    const req1 = httpMocks.createRequest({method: 'POST', url: '/api/save', body: {contents: "some stuff"}});
    const res1 = httpMocks.createResponse();
    save(req1, res1);

    assert.deepStrictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(), 'required argument "name" was missing or invalid');

    const req2 = httpMocks.createRequest({method: 'POST', url: '/api/save', body: {name: 103, contents: "some stuff"}});
    const res2 = httpMocks.createResponse();
    save(req2, res2);

    assert.deepStrictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(), 'required argument "name" was missing or invalid');

    // Second branch, straight line code, error case
    const req3 = httpMocks.createRequest({method: 'POST', url: '/api/save', body: {name: "some stuff"}});
    const res3 = httpMocks.createResponse();
    save(req3, res3);

    assert.deepStrictEqual(res3._getStatusCode(), 400);
    assert.deepStrictEqual(res3._getData(), 'required arguement "content" (square) was missing');

    const req4 = httpMocks.createRequest({method: 'POST', url: '/api/save', body: {name: "abcdef"}});
    const res4 = httpMocks.createResponse();
    save(req4, res4);

    assert.deepStrictEqual(res4._getStatusCode(), 400);
    assert.deepStrictEqual(res4._getData(), 'required arguement "content" (square) was missing');

    // Third branch, straight line code, success case
    const req5 = httpMocks.createRequest({method: 'POST', url: 'api/save', body: {name: 'asdg', content: 'some stuff'}});
    const res5 = httpMocks.createResponse();
    save(req5, res5);

    assert.deepStrictEqual(res5._getStatusCode(), 200);
    assert.deepStrictEqual(res5._getData(), {saved: true});

    const req6 = httpMocks.createRequest({method: 'POST', url: '/api/save', body: {name: "rthjw", content: "other stuff"}});
    const res6 = httpMocks.createResponse();
    save(req6, res6);

    assert.deepStrictEqual(res6._getStatusCode(), 200);
    assert.deepStrictEqual(res6._getData(), {saved: true});

    clearFiles();
  });

  it ('load', function() {
    clearFiles();
    // First branch, straight line code, error case
    const req1 = httpMocks.createRequest({method: 'GET', url: '/api/load', query: {contents: "some stuff"}});
    const res1 = httpMocks.createResponse();
    load(req1, res1);

    assert.deepStrictEqual(res1._getStatusCode(), 400);
    assert.deepStrictEqual(res1._getData(), 'required argument "name" was missing or invalid');

    const req2 = httpMocks.createRequest({method: 'GET', url: '/api/load', query: {name: 103, contents: "some stuff"}});
    const res2 = httpMocks.createResponse();
    load(req2, res2);

    assert.deepStrictEqual(res2._getStatusCode(), 400);
    assert.deepStrictEqual(res2._getData(), 'required argument "name" was missing or invalid');

    // Second branch, straight line code, error case
    const req3 = httpMocks.createRequest({method: 'GET', url: '/api/load', query: {name: "some stuff"}});
    const res3 = httpMocks.createResponse();
    load(req3, res3);

    assert.deepStrictEqual(res3._getStatusCode(), 404);
    assert.deepStrictEqual(res3._getData(), 'given square: "some stuff" does not exist');

    const req4 = httpMocks.createRequest({method: 'GET', url: '/api/load', query: {name: "abcdef"}});
    const res4 = httpMocks.createResponse();
    load(req4, res4);

    assert.deepStrictEqual(res4._getStatusCode(), 404);
    assert.deepStrictEqual(res4._getData(), 'given square: "abcdef" does not exist');

    // Third branch, straight line code, success case
    const sReq5 = httpMocks.createRequest({method: 'POST', url: 'api/save', body: {name: "hello", content: "some stuff"}});
    const sRes5 = httpMocks.createResponse();
    save(sReq5, sRes5);

    const lReq5 = httpMocks.createRequest({method: 'GET', url: 'api/load', query: {name: "hello"}});
    const lRes5 = httpMocks.createResponse();
    load(lReq5, lRes5);

    assert.deepStrictEqual(lRes5._getStatusCode(), 200);
    assert.deepStrictEqual(lRes5._getData(), {name: "hello", content: "some stuff"});

    const sReq6 = httpMocks.createRequest({method: 'POST', url: '/api/save', body: {name: "dalgsh", content: "other stuff"}});
    const sRes6 = httpMocks.createResponse();
    save(sReq6, sRes6);

    const req6 = httpMocks.createRequest({method: 'GET', url: '/api/load', query: {name: "dalgsh", content: "other stuff"}});
    const res6 = httpMocks.createResponse();
    load(req6, res6);

    assert.deepStrictEqual(res6._getStatusCode(), 200);
    assert.deepStrictEqual(res6._getData(), {name: "dalgsh", content: "other stuff"});
    clearFiles();
  });

  it('names', function() {
    clearFiles();
    // Straight line code
    // names is empty
    const req1 = httpMocks.createRequest({method: 'GET', url: '/api/names'});
    const res1 = httpMocks.createResponse();
    names(req1, res1);

    assert.deepStrictEqual(res1._getStatusCode(), 200);
    assert.deepStrictEqual(res1._getData(), {names: []});

    // names is not empty
    const sReq2 = httpMocks.createRequest({method: 'POST', url: '/api/save', body: {name: "dalgsh", content: "some stuff"}});
    const sRes2 = httpMocks.createResponse();
    save(sReq2, sRes2);

    const req2 = httpMocks.createRequest({method: 'GET', url: '/api/names'});
    const res2 = httpMocks.createResponse();
    names(req2, res2);

    assert.deepStrictEqual(res2._getStatusCode(), 200);
    assert.deepStrictEqual(res2._getData(), {names: ["dalgsh"]});

    const sReq3 = httpMocks.createRequest({method: 'POST', url: '/api/save', body: {name: "abc", content: "other stuff"}});
    const sRes3 = httpMocks.createResponse();
    save(sReq3, sRes3);

    const req3 = httpMocks.createRequest({method: 'GET', url: '/api/names'});
    const res3 = httpMocks.createResponse();
    names(req3, res3);

    assert.deepStrictEqual(res3._getStatusCode(), 200);
    assert.deepStrictEqual(res3._getData(), {names: ["dalgsh", "abc"]});
    clearFiles();
  });
});
