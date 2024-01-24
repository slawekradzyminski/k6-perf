import { sleep } from 'k6';
import { Options } from 'k6/options';
import { loginAs } from '../http/postSignin';
import { SharedArray } from 'k6/data';
import { LoginRequest } from '../domain/login';

export const options: Options = {
    scenarios: {
        login: {
            executor: 'ramping-arrival-rate',
            startRate: 0,
            timeUnit: '1m',
            preAllocatedVUs: 50,
            maxVUs: 100,
            stages: [
                { target: 90, duration: '2m' },
                { target: 90, duration: '6m' },
                { target: 0, duration: '2m' },
            ],
        },
    },
    thresholds: {
        'http_req_failed': ['rate<0.02'],
        'checks': ['rate>0.95'],
        'http_req_duration{get:false}': ['p(95)<3000'],
    }
};

const data = new SharedArray('json data', function () {
    return JSON.parse(open('./users.json'));
});

export default () => {
    const randomCredentials = data[getRandomRowIndex()] as LoginRequest
    loginAs(randomCredentials.username, randomCredentials.password)
    sleep(2)
};

const getRandomRowIndex = () => Math.floor(Math.random() * data.length)
