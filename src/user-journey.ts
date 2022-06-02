import { sleep } from 'k6';
import { Options } from 'k6/options';
import { getRandomUser } from '../util/user';
import { register } from '../request/registerRequest';
import { login } from '../request/loginRequest';

export const options: Options = {
  vus: 2,
  iterations: 2
};

export default () => {
  let token: string | undefined
  const user = getRandomUser()

  register(user)
  sleep(5)
  token = login(user)
};
