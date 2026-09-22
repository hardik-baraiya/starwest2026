const { expect } = require('chai');
const request = require('supertest');
const { baseUrl } = require('./hooks');

describe('Path: POST /api/register', () => {
  it('registers a new user', async () => {
    const uniqueUsername = `dave_${Date.now()}`;

    const res = await request(baseUrl)
      .post('/api/register')
      .send({ username: uniqueUsername, password: 'dave123' });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('username', uniqueUsername);
  });
});
