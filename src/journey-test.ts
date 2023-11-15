import { sleep } from 'k6';
import { Options } from 'k6/options';

import { getRandomUser } from '../generators/user';
import { login } from '../requests/postSignIn';
import { register } from '../requests/postSignUp';
import { getUsers } from '../requests/getAllUsers';
import { getUser } from '../requests/getUser';

// @ts-ignore
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// @ts-ignore
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { edit } from '../requests/putUser';
import { repeatNTimes, executeWithProbability } from '../utils/executors';
import { sendEmail } from '../requests/postEmail';
import { getRandomString } from '../generators/random';

export function setup() {
    return "hello" + getRandomString();
}

// Performance test
export let options: Options = {
    vus: 1,
    iterations: 1,
    duration: '20m',
    thresholds: {
        // http errors should be less than 3%
        'http_req_failed': ['rate<0.03'],
        // for requests tagged as high priority errors should be less than 1%
        'http_req_failed{highPriority:true}': ['rate<0.01'],
        // 95% of requests should be below 2 seconds and 99% of requests should be below 4 seconds
        // values here are defined in milliseconds
        'http_req_duration': ['p(95)<2000', 'p(99)<4000'],
        // the rate of successful checks should be higher than 90%
        'checks': ['rate>0.9']
    },
};

// Functional test
export default (prefix: string) => {
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
    sleep(2)
    executeWithProbability(() => edit(token, user), 0.5)
    sleep(2)
    repeatNTimes(() => sendEmail(token, user.email, prefix), 2)
};

export function teardown(prefix: string) {
    console.log(prefix)
}

export function handleSummary(data: any) {
    return {
        "result.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
