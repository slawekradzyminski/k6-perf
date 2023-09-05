import { check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../http/headers';
import { LoginRequest } from '../domain/loginTypes';
import { SharedArray } from 'k6/data';
import { getRandomIndex } from '../util/random';

export const options: Options = {
  vus: 5,
  iterations: 5
};

const data = new SharedArray('users json data', () => {
  return JSON.parse(open('./users.json')).users;
});

const loginRequestBody = (): string => {
  const randomUser = data[getRandomIndex(data.length)] as LoginRequest;

  const body: LoginRequest = {
    username: randomUser.username,
    password: randomUser.password
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
