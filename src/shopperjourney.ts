import { sleep } from 'k6';
import { Options } from 'k6/options';
import { login } from '../http/postSignIn';
import { getRandomUser } from '../generators/userGenerator';

export let options:Options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    checks: ['rate == 1'],
  },
};

export default () => {
  const user = getRandomUser()
  // register(user)
  sleep(3)
  login(user.username, user.password)
  sleep(1);
};
