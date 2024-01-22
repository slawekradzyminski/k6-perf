import { check, sleep } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { LoginRequest } from '../domain/login';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../config/headers';
import { getRandomUser } from '../generators/userGenerator';

export let options:Options = {
  vus: 2,
  iterations: 2,
  thresholds: {
    http_req_failed: ['rate<0.02'],
    checks: ['rate>0.95'] // % udanych soft assercji
  }
};

export default () => {
  // register
  const user = getRandomUser()
  const registerResponse = http.post(`${baseUrl}/users/signup`, JSON.stringify(user), {
    headers: jsonHeaders
  })
  check(registerResponse, {
    'register status is 201': () => registerResponse.status === 201,
  });

  sleep(3)

  // login
  const loginRequest: LoginRequest = {
    username: user.username,
    password: user.password,
  }
  const loginResponse = http.post(`${baseUrl}/users/signin`, JSON.stringify(loginRequest), {
    headers: jsonHeaders,
  });
  check(loginResponse, {
    'login status is 200': () => loginResponse.status === 200,
  });
};
