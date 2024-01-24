import { check, sleep } from 'k6';
import { Options } from 'k6/options';
import { login } from '../http/postSignin';
import { getAllUsers } from '../http/getAllUsers';
import http from 'k6/http';
import { baseUrl } from '../config/constants';
import { getAuthHeaders } from '../config/headers';
import { getRandomUser } from '../generators/userGenerator';
import { register } from '../http/postSignup';

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
        .forEach(username => {
        const deleteResponse = http.del(`${baseUrl}/users/${username}`, {}, {
            headers: getAuthHeaders(token)
        })
        check(deleteResponse, {
            'delete status is 204': () => deleteResponse.status === 204,
        });
    })

    const deleteResponse = http.del(`${baseUrl}/users/${user.username}`, {}, {
        headers: getAuthHeaders(token)
    })
    check(deleteResponse, {
        'delete status is 204': () => deleteResponse.status === 204,
    });
};
