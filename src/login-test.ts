import { check } from 'k6';
import { Options } from 'k6/options';

/* @ts-ignore */
import http from 'k6/http';
import { LoginRequest } from '../domain/interfaces/login';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../http/headers';

export let options:Options = {
  vus: 2,
  iterations: 2,
};

export default () => {
  const adminLoginRequest: LoginRequest = {
      username: 'admin',
      password: 'admin'
  }

  const loginResponse = http.post(`${baseUrl}/users/signin`, JSON.stringify(adminLoginRequest), {
    headers: jsonHeaders
  });
  check(loginResponse, {
    'status is 200': () => loginResponse.status === 200
  })

};
