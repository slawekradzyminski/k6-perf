import { check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { LoginRequest } from '../domain/login';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../config/headers';

export let options:Options = {
  vus: 1,
  iterations: 1
};

export default () => {
  const loginRequest: LoginRequest = {
    username: 'admin',
    password: 'admin'
  }
  const res = http.post(`${baseUrl}/users/signin`, JSON.stringify(loginRequest), {
    headers: jsonHeaders,
  });

  check(res, {
    'status is 200': () => res.status === 200,
  });
};
