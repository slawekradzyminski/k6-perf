import { sleep, check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../http/headers';
/* @ts-ignore */
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';
import { getRandomUser } from '../util/userProvider';

export let options:Options = {
  vus: 4,
  iterations: 4
};

export default () => {
  const loginRequestBody = () => {
    const randomUser = getRandomUser()

    const jsonBody = {
      password: randomUser.username,
      username: randomUser.password
    }
    return JSON.stringify(jsonBody)
  }

  const loginResponse = http.post(`${baseUrl}/users/signin`, loginRequestBody(), {
      headers: jsonHeaders
  });

  check(loginResponse, {
    'status is 200': r => r.status === 200,
  });

  sleep(randomIntBetween(1,3));

};