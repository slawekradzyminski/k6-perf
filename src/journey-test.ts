import { sleep } from 'k6';
import { Options } from 'k6/options';

import { getRandomUser } from '../generators/user';
import { login } from '../requests/postSignIn';
import { register } from '../requests/postSignUp';
import { getUsers } from '../requests/getAllUsers';
import { getUser } from '../requests/getUser';

// Performance test
export let options: Options = {
    vus: 2,
    iterations: 6,
    duration: '20m'
};

// Functional test
export default () => {
    // given
    let token: string
    const user = getRandomUser()

    // when
    register(user)
    sleep(3)
    token = login(user)
    sleep(2)
    repeatNTimes(() => getUsers(token), 3.5)
    sleep(2)
    executeWithProbability(() => getUser(token, user.username), 0.5)
};

const repeatNTimes = (fn: Function, n: number) => {
    for (let i = 0; i < Math.floor(n); i++ ) {
        fn()
    }
    // last iteration with certain probability. So for 3.5 last iteration with probability 50%
    executeWithProbability(fn, n - Math.floor(n))
}

const executeWithProbability = (fn: Function, p: number) => {
    if (Math.random() <= p) {
        fn()
    }
}
