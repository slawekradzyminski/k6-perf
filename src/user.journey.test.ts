import { sleep } from 'k6';
import { Options } from 'k6/options';
import { getRandomUser } from '../generators/userGenerator';
import { register } from '../http/postSignup';
import { login } from '../http/postSignin';
import { getAllUsers } from '../http/getAllUsers';
import { getUserByUsername } from '../http/getSingleUser';
import { edit } from '../http/putUser';
// @ts-ignore
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// @ts-ignore
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { sendEmail } from '../http/postEmail';
import { getRandomString } from '../utils/random';
import { repeatNTimes, runWithProbability } from '../utils/proportions';
import { deleteUser } from '../http/deleteUser';

export let options: Options = {
  stages: [
    { duration: '30s', target: 150 }, // fast ramp-up to a high point
    { duration: '3m', target: 0 }, // quick ramp-down to 0 users
  ],
  thresholds: {
    'http_req_failed': ['rate<0.02'],
    'checks': ['rate>0.95'],
    'http_req_duration{get:false}': ['p(95)<3000'],
    'http_req_duration{get:true}': ['p(95)<1500'],
  }
};

export function setup() {
  const prefix = getRandomString();
  return prefix;
}

export default (prefix: string) => {
  const user = getRandomUser()
  register(user) // 2rps
  sleep(3)
  const token = login(user) // 2rps
  sleep(1)
  repeatNTimes(() => getAllUsers(token), 3.5) // 6.5 rps
  sleep(3)
  runWithProbability(() => getUserByUsername(token, user.username), 0.5) // 1 rps
  sleep(3)
  runWithProbability(() => edit(token, user), 0.5) // 1 rps
  sleep(2)
  repeatNTimes(() => sendEmail(user.email, prefix), 2) // 2 rps
  sleep(2)
  runWithProbability(() => deleteUser(token, user.username), 0.25) // 5 rps
  sleep(2)
};

export function handleSummary(data: any) {
  return {
    "result.html": htmlReport(data),
    'prefix.json': JSON.stringify({ prefix: data.setup_data }, null, 2),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
