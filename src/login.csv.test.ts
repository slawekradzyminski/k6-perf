import { check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { LoginRequest } from '../domain/login';
import { baseUrl } from '../config/constants';
import { jsonHeaders } from '../config/headers';
import { SharedArray } from 'k6/data';
import Papa from 'papaparse';

const csvData = new SharedArray('csv data', function () {
    return Papa.parse(open('./credentials.csv'), { header: true }).data;
});

export let options: Options = {
    vus: 4,
    iterations: 4,
    thresholds: {
        http_req_failed: ['rate<0.02'],
        checks: ['rate>0.95'] // % udanych soft assercji
    }
};

export default () => {
    const randomCredentials = csvData[getRandomRowIndex()] as LoginRequest

    const loginRequest: LoginRequest = {
        username: randomCredentials.username,
        password: randomCredentials.password
    }
    const res = http.post(`${baseUrl}/users/signin`, JSON.stringify(loginRequest), {
        headers: jsonHeaders,
    });
    check(res, {
        'login status is 200': () => res.status === 200,
    });
};

const getRandomRowIndex = () => Math.floor(Math.random() * csvData.length)

