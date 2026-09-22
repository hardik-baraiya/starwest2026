const { expect } = require('chai');
const request = require('supertest');
const { baseUrl } = require('./hooks');

describe('Path: POST /api/login', () => {
  it('logs in a seeded user and returns a JWT token', async () => {
    const res = await request(baseUrl)
      .post('/api/login')
      .send({ username: 'alice', password: 'alice123' });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
    expect(res.body.token).to.be.a('string');
  });
});
