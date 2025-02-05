import { sleep } from 'k6';
import { Options } from 'k6/options';
import { login } from '../http/postSignIn';
import { SharedArray } from 'k6/data';
import { LoginRequest } from '../types/loginTypes';
import Papa from 'papaparse';

const data = new SharedArray('users', function () {
  return Papa.parse(open('./users.csv'), { header: true }).data;
});

export let options:Options = {
  vus: 5,
  iterations: 5,
  thresholds: {
    checks: ['rate == 1'],
  },
};

export default () => {
  const user = data[Math.floor(Math.random() * data.length)] as LoginRequest;
  login(user.username, user.password)
  sleep(1);
};
