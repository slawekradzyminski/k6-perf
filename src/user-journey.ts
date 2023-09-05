import { check, sleep } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { baseUrl } from '../config/constants';
import { getRandomUser } from '../util/user';
import { RegisterRequest } from '../domain/registerTypes';
import { jsonHeaders } from '../http/headers';

export const options: Options = {
  vus: 5,
  iterations: 5
};

export default () => {
  // 1 Registration
  const user: RegisterRequest = getRandomUser()
  const registrationResult = http.post(`${baseUrl}/users/signup`, JSON.stringify(user), {
    headers: jsonHeaders
  })

  check(registrationResult, {
    'registration status is 201': () => registrationResult.status === 201,
  });

  sleep(3)

  // 2 Login
  const loginRequest = {
    username: user.username,
    password: user.password
  }

  const loginResult = http.post(`${baseUrl}/users/signin`, JSON.stringify(loginRequest), {
    headers: jsonHeaders
  })

  check(loginResult, {
    'login status is 200': () => loginResult.status === 200,
  });
};
