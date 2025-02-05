import { sleep } from 'k6';
import { Options } from 'k6/options';
import { login } from '../http/postSignIn';
import { getRandomUser } from '../generators/userGenerator';
import { register } from '../http/postSignUp';

export let options:Options = {
  vus: 5,
  iterations: 5,
  thresholds: {
    checks: ['rate == 1'],
  },
};

export default () => {
  const user = getRandomUser()

  register(user)
  sleep(3)
  login(user.username, user.password)
  sleep(1);
};
