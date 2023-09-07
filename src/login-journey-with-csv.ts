import { Options } from 'k6/options';
import { login } from '../requests/login';
import papa from "papaparse";
import { SharedArray } from 'k6/data';
import { LoginRequest } from '../domain/interfaces/login';

const csvData = new SharedArray('users data', () => {
    return papa.parse(open('./users.csv'), { header: true }).data
})

export let options: Options = {
    vus: 20,
    iterations: 160,
    thresholds: {
        checks: ['rate>0.9'],
    }
};

export default () => {
    const getRandomIndex = Math.floor(Math.random() * csvData.length);
    const randomUser = csvData[getRandomIndex] as LoginRequest;
    login(randomUser)
};
