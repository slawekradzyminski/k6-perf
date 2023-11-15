import { Options } from 'k6/options';
import { login } from '../requests/postSignIn';
import { getUsers } from '../requests/getAllUsers';
import { deleteUser } from '../requests/deleteUser';
import { sleep } from 'k6';
// @ts-ignore
import { randomIntBetween } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

const admin = 'admin'

export let options: Options = {
    vus: 1,
    iterations: 1,
};

export default () => {
    const token = login({ username: admin, password: admin })
    sleep(2)
    const users = getUsers(token)
    sleep(2)
    users
        .filter(user => user.username !== admin)
        .forEach(user => {
            // albo jeszcze lepiej zrobić losowe czekanie w milisekundach
            sleep(randomIntBetween(1, 60))
            deleteUser(token, user.username)
        })
};


