import * as assert from 'assert';
import * as httpMocks from 'node-mocks-http';
import { getGuests, addGuest, updateGuest, deleteGuest } from './routes';

describe('routes', function() {

  // Test for getGuests route
  it('get', function() {
    const req = httpMocks.createRequest({
      method: 'GET',
      url: '/api/guests'
    });
    const res = httpMocks.createResponse();
    
    getGuests(req, res);
    
    assert.strictEqual(res._getStatusCode(), 200);
    assert.deepStrictEqual(res._getData(), []);
  });

  // Test for addGuest route
  it('add', function() {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/guests',
      body: { name: 'John Doe' }
    });
    const res = httpMocks.createResponse();
    
    addGuest(req, res);
    
    assert.strictEqual(res._getStatusCode(), 201);
    assert.deepStrictEqual(res._getData(), { name: 'John Doe' });
  });

  it('missingGuetName', function() {
    const req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/guests',
      body: {}
    });
    const res = httpMocks.createResponse();
    
    addGuest(req, res);
    
    assert.strictEqual(res._getStatusCode(), 400);
    assert.deepStrictEqual(res._getData(), 'Guest name is required.');
  });

  // Test for updateGuest route
  it('update', function() {
    // First add a guest to update
    let req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/guests',
      body: { name: 'Jane Doe' }
    });
    let res = httpMocks.createResponse();
    addGuest(req, res);

    req = httpMocks.createRequest({
      method: 'PUT',
      url: '/api/guests/Jane Doe',
      params: { name: 'Jane Doe' },
      body: { name: 'Jane Smith' }
    });
    res = httpMocks.createResponse();
    
    updateGuest(req, res);
    
    assert.strictEqual(res._getStatusCode(), 200);
    assert.deepStrictEqual(res._getData(), { name: 'Jane Smith' });
  });

  it('guestUpdateMissing', function() {
    const req = httpMocks.createRequest({
      method: 'PUT',
      url: '/api/guests/Unknown',
      params: { name: 'Unknown' },
      body: { name: 'New Name' }
    });
    const res = httpMocks.createResponse();
    
    updateGuest(req, res);
    
    assert.strictEqual(res._getStatusCode(), 404);
    assert.deepStrictEqual(res._getData(), 'Guest not found.');
  });

  it('guestUpdateNameMissing', function() {
    const req = httpMocks.createRequest({
      method: 'PUT',
      url: '/api/guests/John Doe',
      params: { name: 'John Doe' },
      body: {}
    });
    const res = httpMocks.createResponse();
    
    updateGuest(req, res);
    
    assert.strictEqual(res._getStatusCode(), 400);
    assert.deepStrictEqual(res._getData(), 'Updated guest name is required.');
  });

  // Test for deleteGuest route
  it('deleteGuest', function() {
    // First add a guest to delete
    let req = httpMocks.createRequest({
      method: 'POST',
      url: '/api/guests',
      body: { name: 'John Smith' }
    });
    let res = httpMocks.createResponse();
    addGuest(req, res);

    req = httpMocks.createRequest({
      method: 'DELETE',
      url: '/api/guests/John Smith',
      params: { name: 'John Smith' }
    });
    res = httpMocks.createResponse();
    
    deleteGuest(req, res);
    
    assert.strictEqual(res._getStatusCode(), 204);
    assert.strictEqual(res._getData(), '');
  });

  it('deletingNonGuest', function() {
    const req = httpMocks.createRequest({
      method: 'DELETE',
      url: '/api/guests/NonExistent',
      params: { name: 'NonExistent' }
    });
    const res = httpMocks.createResponse();
    
    deleteGuest(req, res);
    
    assert.strictEqual(res._getStatusCode(), 204);
    assert.strictEqual(res._getData(), '');
  });


});