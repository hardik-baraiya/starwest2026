import http from 'k6/http';
import { check, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:3000/api';

// Valid users seeded by the API (see README.md)
const users = [
  { username: 'alice', password: 'alice123' },
  { username: 'bob', password: 'bob123' },
];

export const options = {
  stages: [
    { duration: '5s', target: 10 },
    { duration: '20s', target: 30 },
    { duration: '5s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    checks: ['rate==1'],
  },
};

export default function () {
  const user = users[(__VU + __ITER) % users.length];

  const res = http.post(`${BASE_URL}/login`, JSON.stringify(user), {
    headers: { 'Content-Type': 'application/json' },
  });

  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has token': (r) => typeof r.json('token') === 'string' && r.json('token').length > 0,
  });

  sleep(1);
}
