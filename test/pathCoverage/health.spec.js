const { expect } = require('chai');
const request = require('supertest');
const { baseUrl } = require('./hooks');

describe('Path: GET /api/health', () => {
  it('returns the API status', async () => {
    const res = await request(baseUrl).get('/api/health');

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('status', 'ok');
    expect(res.body).to.have.property('uptime');
  });
});
