const { expect } = require('chai');
const request = require('supertest');
const { baseUrl } = require('./hooks');

describe('Path: POST /api/checkout', () => {
  let token;

  before(async () => {
    const res = await request(baseUrl)
      .post('/api/login')
      .send({ username: 'alice', password: 'alice123' });
    token = res.body.token;
  });

  it('checks out with cash and applies the 10% discount', async () => {
    const res = await request(baseUrl)
      .post('/api/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send({ paymentMethod: 'cash', items: [{ productId: 1, quantity: 2 }] });

    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('paymentMethod', 'cash');
    expect(res.body).to.have.property('subtotal', 51.98);
    expect(res.body).to.have.property('discount', 5.2);
    expect(res.body).to.have.property('total', 46.78);
  });
});
