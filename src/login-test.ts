import { check, sleep } from 'k6';
import { Options } from 'k6/options';

/* @ts-ignore */
import http from 'k6/http';
import { LoginRequest } from '../domain/interfaces/login';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../http/headers';
import { getRandomUser } from '../utils/user';

export let options: Options = {
    vus: 2,
    iterations: 2,
};

const adminLoginRequest = (username: string, password: string): LoginRequest => {
    return { username, password }
}

export default () => {
    const user = getRandomUser()

    // register
    const registerResponse = http.post(`${baseUrl}/users/signup`, JSON.stringify(user), {
        headers: jsonHeaders
    });
    check(registerResponse, {
        'status is 201': () => registerResponse.status === 201
    })

    sleep(3)
    // login
    const loginResponse = http.post(`${baseUrl}/users/signin`, JSON.stringify(adminLoginRequest(user.username, user.password)), {
        headers: jsonHeaders
    });
    check(loginResponse, {
        'status is 200': () => loginResponse.status === 200
    })

};
