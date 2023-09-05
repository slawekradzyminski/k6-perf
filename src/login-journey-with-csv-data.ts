import { check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../http/headers';
import { LoginRequest } from '../domain/loginTypes';
import { SharedArray } from 'k6/data';
import papa from "papaparse";
import { getRandomIndex } from '../util/random';

export const options: Options = {
  vus: 5,
  iterations: 5
};

const csvData = new SharedArray('users data', () => {
  return papa.parse(open('./users.csv'), { header: true }).data
})

const loginRequestBody = (): string => {
  const randomUser = csvData[getRandomIndex(csvData.length)] as LoginRequest;

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
