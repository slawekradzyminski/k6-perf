import { sleep, check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';

const backendUrl = __ENV.BACKEND_URL || 'http://localhost:4001';

// test wydajnościowy (generator ruchu)
export let options:Options = {
  vus: 1,
  iterations: 1
};

// test funkcjonalny (czyli to co zrobimy jeden wirtualny klient)
export default () => {
  const loginRequest = JSON.stringify({
    username: 'admin',
    password: 'admin'
  })

  const params = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const res = http.post(`${backendUrl}/users/signin`, loginRequest, params);
  check(res, {
    'status is 200': () => res.status === 200,
  });

  sleep(1);
};
