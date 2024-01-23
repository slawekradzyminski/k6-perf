import { sleep } from 'k6';
import { Options } from 'k6/options';
import { getRandomUser } from '../generators/userGenerator';
import { register } from '../http/postSignup';
import { login } from '../http/postSignin';
import { getAllUsers } from '../http/getAllUsers';
import { getUserByUsername } from '../http/getSingleUser';

export let options: Options = {
  vus: 2,
  iterations: 2,
  thresholds: {
    http_req_failed: ['rate<0.02'],
    checks: ['rate>0.95'] // % udanych soft assercji
  }
};

export default () => {
  const user = getRandomUser()
  register(user)
  sleep(3)
  const token = login(user)
  sleep(1)
  getAllUsers(token)
  sleep(3)
  getUserByUsername(token, user.username)
};
