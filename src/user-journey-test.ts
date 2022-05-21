import { sleep } from 'k6';
import { Options } from 'k6/options';
/* @ts-ignore */
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';
import { randomUser } from '../domain/user';
import { registerUser } from '../requests/register';
import { loginUser } from '../requests/login';
import { getUsers } from '../requests/users';
import { editUser } from '../requests/edit';

export let options:Options = {
  vus: 3,
  iterations: 3
};

export default () => {
  const user = randomUser()
  // 1
  registerUser(user)
  sleep(randomIntBetween(1,3))

  // 2
  const token = loginUser(user)
  sleep(randomIntBetween(1,3))

  // 3
  getUsers(token)
  sleep(randomIntBetween(1,3))

  // 4
  editUser(user, token)
};