import { check, sleep } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { baseUrl } from '../config/constants';
import { getRandomUser } from '../util/user';
import { RegisterRequest } from '../domain/registerTypes';
import { jsonHeaders } from '../http/headers';

export const options: Options = {
  vus: 1,
  iterations: 1
};

const registerBody = () => {
  const user: RegisterRequest = getRandomUser()
  return JSON.stringify(user)
}

export default () => {
  const registrationResult = http.post(`${baseUrl}/users/signup`, registerBody(), {
    headers: jsonHeaders
  })

  check(registrationResult, {
    'status is 201': () => registrationResult.status === 201,
  });

  sleep(3)

  http.post
};
