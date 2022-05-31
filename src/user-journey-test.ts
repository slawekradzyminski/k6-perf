import { JSONObject, sleep } from 'k6';
import { Options } from 'k6/options';
/* @ts-ignore */
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';
import { randomUser } from '../domain/user';
import { registerUser } from '../requests/register';
import { loginUser } from '../requests/login';
import { getUsers } from '../requests/users';
import { editUser } from '../requests/edit';
/* @ts-ignore */
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options: Options = {
  stages: [
    { duration: '2m', target: 10 },
    { duration: '4m', target: 20 }, 
    { duration: '30s', target: 0 }, 
  ],
  thresholds: {
    http_req_failed: ['rate<0.1'],
    http_req_duration: ['p(50)<1500'], 
    checks: ['rate>0.9'],
  },
};

export default () => {
  const user = randomUser()
  // 1
  registerUser(user)
  sleep(5)

  // 2
  const token = loginUser(user)
  sleep(5)

  // 3
  getUsers(token)
  sleep(2)

  // 4
  editUser(user, token)
  sleep(5)
};

export function handleSummary(data: JSONObject) {
  return {
    "summary.html": htmlReport(data),
  };
}