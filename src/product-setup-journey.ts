import { sleep } from 'k6';
import { Options } from 'k6/options';
import { login } from '../http/postSignIn';

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
  const token = login('admin', 'admin')
  sleep(1);
};
