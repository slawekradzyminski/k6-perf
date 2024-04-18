import { sleep } from 'k6';
import { Options } from 'k6/options';
import { login } from './http/login';
import { register } from './http/register';

// część która definiuje ilość ruchu
export let options:Options = {
  vus: 3, 
  duration: '10s'
};

// część która definiuje ruch jednego uzytkownika
export default () => {
  const { username, password } = register();
  sleep(2);
  login(username, password);
  sleep(1); // Sleep for 1 second
};
