import { sleep } from 'k6';
import { Options } from 'k6/options';
import { login } from '../http/postSignIn';
import { getRandomUser } from '../generators/userGenerator';
import { register } from '../http/postSignUp';
import { getMe } from '../http/getMe';

export let options:Options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    checks: [
      {
        threshold: 'rate == 1',
        abortOnFail: false,
        delayAbortEval: '4s'
      },
    ],
  },
};

export default () => {
  const user = getRandomUser()

  register(user)
  sleep(3)
  const token = login(user.username, user.password)
  sleep(1);
  getMe(token)
};
