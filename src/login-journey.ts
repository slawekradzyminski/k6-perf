import { check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../http/headers';
import { LoginRequest } from '../domain/loginTypes';

export const options: Options = {
  vus: 5,
  iterations: 5
};

const loginRequestBody = (): string => {
  const body: LoginRequest = {
    password: 'admin',
    username: 'admin'
  }
  return JSON.stringify(body)
}

export default () => {
  const loginResponse = http.post(`${baseUrl}/users/signin`, loginRequestBody(), {
    headers: jsonHeaders
  });
  check(loginResponse, {
    'status is 200': () => loginResponse.status === 200,
  });
};
