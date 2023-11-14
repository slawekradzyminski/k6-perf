import { Options } from 'k6/options';

import { login } from '../requests/postSignIn';
import { SharedArray } from 'k6/data';
import papa from 'papaparse';
import { UserCredentials } from '../domain/register';
import { sleep } from 'k6';

const csvData = new SharedArray('another data name', function () {
    // Load CSV file and parse it using Papa Parse
    return papa.parse(open('./data.csv'), { header: true }).data;
});

// Performance test
export let options: Options = {
    vus: 10,
    iterations: 20,
};

// Functional test
export default () => {
    const randomUser = csvData[getRandomRowIndex()] as UserCredentials;
    login(randomUser)
    sleep(2)
};

const getRandomRowIndex = () => Math.floor(Math.random() * csvData.length)

