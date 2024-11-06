import { sleep, check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';

/* @ts-ignore */
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export let options: Options = {
  // Start with a smoke test configuration
  vus: 1,
  duration: '10s',
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<1000'], // 95% of requests should be below 1s
  }
};

export default () => {
  const url = 'http://localhost:4001/users/signin';
  const payload = JSON.stringify({
    username: 'admin',
    password: 'admin'
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const res = http.post(url, payload, params);

  // Verify the response
  check(res, {
    'status is 200': (r) => r.status === 200,
    'has valid token': (r) => r.json('token') !== undefined,
    'correct username returned': (r) => r.json('username') === 'admin',
    'has roles': (r) => Array.isArray(r.json('roles')),
  });

  sleep(randomIntBetween(1, 3));
}; 