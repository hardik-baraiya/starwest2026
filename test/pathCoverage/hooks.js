const app = require('../../src/app');

const TEST_PORT = process.env.TEST_PORT || 3001;
let server;

exports.mochaHooks = {
  beforeAll(done) {
    server = app.listen(TEST_PORT, () => done());
  },
  afterAll(done) {
    server.close(done);
  },
};

exports.baseUrl = `http://localhost:${TEST_PORT}`;
