import { sleep } from 'k6';
import { Options } from 'k6/options';

import { getRandomUser } from '../generators/user';
import { login } from '../requests/postSignIn';
import { register } from '../requests/postSignUp';

// Performance test
export let options: Options = {
    vus: 1,
    iterations: 1,
};

// Functional test
export default () => {
    const user = getRandomUser()
    register(user)
    sleep(3)
    login(user)    
};

