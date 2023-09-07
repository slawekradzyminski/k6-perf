import { Options } from 'k6/options';
import { login } from '../requests/login';
import { SharedArray } from 'k6/data';
import { LoginRequest } from '../domain/interfaces/login';

const usersData = new SharedArray('users json data', () => {
    return JSON.parse(open('./users.json')).users;
  });

export let options: Options = {
    vus: 2,
    iterations: 2,
    thresholds: {
        checks: ['rate>0.9'],
    }
};

export const getRandomIndex = (length: number) => Math.floor(Math.random() * length);

export default () => {
    const randomUser = usersData[getRandomIndex(usersData.length)] as LoginRequest;
    login(randomUser)
};
