import { Options } from 'k6/options';

import { login } from '../requests/postSignIn';
import { SharedArray } from 'k6/data';
import { UserCredentials } from '../domain/register';
import { sleep } from 'k6';

const data = new SharedArray('some data name', function () {
    return JSON.parse(open('./data.json')).users;
});

// Performance test
export let options: Options = {
    vus: 10,
    iterations: 20,
};

// Functional test
export default () => {
    const randomUser = data[getRandomRowIndex()] as UserCredentials;
    login(randomUser)
    sleep(2)
};

const getRandomRowIndex = () => Math.floor(Math.random() * data.length)

