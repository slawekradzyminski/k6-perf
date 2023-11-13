import { check, sleep } from 'k6';
import { Options } from 'k6/options';

import http from 'k6/http';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../config/headers';
import { getRandomUser } from '../generators/user';
import { RegisterRequest } from '../domain/register';
import { LoginRequest } from '../domain/login';

// Performance test
export let options: Options = {
    vus: 1,
    iterations: 1,
};

// Functional test
export default () => {
    const user = getRandomUser()

    // We send register request here
    const registerRequest = http.post(`${baseUrl}/users/signup`, JSON.stringify(user), {
        headers: jsonHeaders
    });

    check(registerRequest, {
        'status is 201': () => registerRequest.status === 201,
    });

    // We sleep here 3 seconds
    sleep(3)

    // We send login request here
    const loginRequest = http.post(`${baseUrl}/users/signin`, JSON.stringify(getLoginBody(user)), {
        headers: jsonHeaders
    });

    // Soft assertions
    check(loginRequest, {
        'status is 200': () => loginRequest.status === 200,
    });
};

const getLoginBody = (user: RegisterRequest): LoginRequest => {
    return {
        username: user.username,
        password: user.password
    }
}