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

export let options: Options = {
  vus: 8,
  iterations: 8,
  thresholds: {
    'http_req_failed': ['rate<0.02'],
    'checks': ['rate>0.95'],
    'http_req_duration{get:false}': ['p(95)<2000'],
    'http_req_duration{get:true}': ['p(95)<1000'],
  }
};

export function setup() {
  const prefix = getRandomString();
  return prefix;
}

export default (prefix: string) => {
  const user = getRandomUser()
  register(user)
  sleep(3)
  const token = login(user)
  sleep(1)
  getAllUsers(token)
  sleep(3)
  getUserByUsername(token, user.username)
  sleep(3)
  edit(token, user)
  sleep(2)
  sendEmail(user.email, prefix)
};

export function handleSummary(data: any) {
  return {
    "result.html": htmlReport(data),
    'prefix.json': JSON.stringify({ prefix: data.setup_data }, null, 2),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
