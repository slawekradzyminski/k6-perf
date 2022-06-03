import { check, JSONObject, sleep } from 'k6';
import { Options } from 'k6/options';
import { getRandomUser } from '../util/user';
import { register } from '../request/registerRequest';
import { login } from '../request/loginRequest';
import { getAllUsers } from '../request/getAllUsersRequest';
import { getSingleUser } from '../request/getSingleUserRequest';
import { getMe } from '../request/getMeRequest';
// @ts-ignore
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// @ts-ignore
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { refreshToken } from '../request/refreshTokenRequest';
import { updateUser } from '../request/updateUserRequest';
import { repeat, runWithProbability } from '../util/requestUtil';
import { SharedArray } from 'k6/data';
import http from 'k6/http';
import { baseUrl } from '../config/constants';
import { LoginRequest } from '../domain/loginTypes';
import { jsonHeaders } from '../http/headers';
import { getRandomIndex } from '../util/random';

export const options: Options = {
  scenarios: {
    userJourney: {
      executor: 'ramping-vus',
      exec: 'userJourney',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 2 },
        { duration: '1m', target: 5 },
      ],
      gracefulRampDown: '60s',
    },
    loginJourney: {
      executor: 'ramping-vus',
      exec: 'loginJourney',
      startVUs: 0,
      stages: [
        { duration: '1m', target: 2 },
        { duration: '1m', target: 5 },
      ],
      gracefulRampDown: '60s',
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    checks: ['rate>0.9'],
  }
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

export function loginJourney() {
  const loginResponse = http.post(`${baseUrl}/users/signin`, loginRequestBody(), {
    headers: jsonHeaders
  });
  check(loginResponse, {
    'status is 200': () => loginResponse.status === 200,
  });
};

export function userJourney() {
  let token: string
  const user = getRandomUser()

  register(user)
  sleep(5)
  token = login(user)
  sleep(2)
  repeat(() => getAllUsers(token), 3)
  sleep(2)
  repeat(() => getSingleUser(user.username, token), 2)
  sleep(2)
  runWithProbability(() => getMe(user.email, token), 0.5)
  sleep(2)
  token = refreshToken(token)
  sleep(3)
  updateUser(user, token)
};

export function handleSummary(data: JSONObject) {
  const reportPath = `summary${Date.now()}.html`;
  return {
    [reportPath]: htmlReport(data),
    'stdout': textSummary(data, { indent: ' ', enableColors: true })
  };
}