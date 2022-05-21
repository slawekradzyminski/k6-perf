import papaparse from '../feeder/papaparse.js';
import { SharedArray } from 'k6/data';
import { getRandomIndex } from './random';

type JsonUser = {
    username: string,
    password: string
}

const usersData = new SharedArray('csv users', () => {
    return papaparse.parse(open('./users.csv'), { header: true }).data;
});

export const getRandomUserFromCsv = (): JsonUser => {
    return usersData[getRandomIndex(usersData.length)] as JsonUser
}
