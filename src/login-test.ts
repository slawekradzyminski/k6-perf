import { check } from 'k6';
import { Options } from 'k6/options';

import http from 'k6/http';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../config/headers';

// Performance test
export let options: Options = {
    vus: 1,
    iterations: 1
};

// Functional test
export default () => {
    const loginRequest = {
        username: 'admin',
        password: 'admin'
    }

    // We send login request
    const res = http.post(`${baseUrl}/users/signin`, JSON.stringify(loginRequest), {
        headers: jsonHeaders
    });

    // Soft assertions
    check(res, {
        'status is 200': () => res.status === 200,
    });
};
