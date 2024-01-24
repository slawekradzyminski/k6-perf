import { sleep } from 'k6';
import { Options } from 'k6/options';
import { login } from '../http/postSignin';
import { getAllUsers } from '../http/getAllUsers';
import { getRandomUser } from '../generators/userGenerator';
import { register } from '../http/postSignup';
import { deleteUser } from '../http/deleteUser';

export let options: Options = {
    vus: 1,
    iterations: 1,
    thresholds: {
        checks: ['rate>0.99']
    }
};

export default () => {
    const user = getRandomUser()
    register(user)
    sleep(1)
    const token = login(user)
    sleep(1)
    getAllUsers(token)
        .map(user => user.username)
        .filter(username => username !== user.username)
        .forEach(username => deleteUser(token, username))

    deleteUser(token, user.username)
};
