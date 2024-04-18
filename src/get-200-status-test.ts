import { sleep, check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';

export let options:Options = {
  vus: 50,
  duration: '10s',
  thresholds: {
    'http_req_failed': ['rate==0'],
  }
};

export default () => {
  const res = http.get('https://test-api.k6.io');
  check(res, {
    'status is 200': () => res.status === 200,
  });
  sleep(1);
};
