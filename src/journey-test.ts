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
import { deleteUser } from '../requests/deleteUser';

export function setup() {
    return "hello" + getRandomString();
}

const morningArrivalRate = 30
const eveningArrivalRate = 40

// Performance test
export const options: Options = {
    scenarios: {
        adminJourney: {
            exec: 'adminJourney',
            executor: 'per-vu-iterations',
            vus: 2,
            iterations: 20
        },

        clientJourney: {
            exec: 'clientJourney',
            executor: 'ramping-arrival-rate',
            // Start iterations per `timeUnit`
            startRate: 30,
            // Start `startRate` iterations per minute
            timeUnit: '30s',
            // Pre-allocate necessary VUs.
            preAllocatedVUs: 100,
            stages: [
                { target: morningArrivalRate, duration: '2m' },
                { target: eveningArrivalRate, duration: '2m' },
                { target: morningArrivalRate, duration: '2m' },
                { target: eveningArrivalRate, duration: '2m' },
            ],
        },
    },
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

export const adminJourney = () => {
    const user = getRandomUser()
    register(user)
    sleep(3)
    login(user)
}

export const clientJourney = (prefix: string) => {
    // given
    let token: string
    const user = getRandomUser()

    // when
    register(user) // 1rps
    sleep(3)
    token = login(user) // 1rps
    sleep(2)
    repeatNTimes(() => getUsers(token), 3.5) // 3.5 rps
    sleep(2)
    executeWithProbability(() => getUser(token, user.username), 0.5) // 0.5 rps
    sleep(2)
    executeWithProbability(() => edit(token, user), 0.5) // 0.5 rps
    sleep(2)
    repeatNTimes(() => sendEmail(token, user.email, prefix), 2) // 2 rps
    sleep(2)
    executeWithProbability(() => deleteUser(token, user.username), 0.25) // 0.25 rps
};

export function teardown(prefix: string) {
    console.log(prefix)
    // in real world we would write this to file and read in next CI job
}

export function handleSummary(data: any) {
    return {
        "result.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
