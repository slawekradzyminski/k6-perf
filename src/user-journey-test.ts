import { sleep } from 'k6';
import { Options } from 'k6/options';
import { login } from './http/login';
import { register } from './http/register';
import { getAllUsers } from './http/getAll';

// część która definiuje ilość ruchu
export let options: Options = {
  vus: 3,
  duration: '10s',
  thresholds: {
    'http_req_failed': ['rate==0'],
  }
};

// część która definiuje ruch jednego uzytkownika
export default () => {
  const { username, password } = register();
  sleep(2);
  const token = login(username, password);
  sleep(1);
  getAllUsers(token);
};
