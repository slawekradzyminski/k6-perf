import { sleep } from 'k6';
import { Options } from 'k6/options';
import { User } from '../domain/registerTypes';
import { Roles } from '../domain/roles';
import { register } from '../request/registerRequest';
import { getRandomEmail, getRandomString } from '../util/random';

export const options: Options = {
    vus: 1,
    iterations: 100
};

export default () => {
    const username = getRandomString()
    const password = 'password'
    const user: User = {
        username: username,
        email: getRandomEmail(),
        password: password,
        firstName: getRandomString(),
        lastName: getRandomString(),
        roles: [Roles.ROLE_ADMIN]
    }
    register(user)
    sleep(0.5)
};
