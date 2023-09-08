import { sleep } from 'k6';
import { Options } from 'k6/options';
import { getRandomUser } from '../utils/user';
import { register } from '../requests/register';
import { login } from '../requests/login';
import { checkGetAllUsers } from '../requests/getAllUsers';
import { checkGetSingleUser } from '../requests/getSingleUser';
import { checkGetMe } from '../requests/getMe';
// @ts-ignore
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// @ts-ignore
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { getRandomEmailTo } from '../utils/emailGenerator';
import { sendEmail } from '../requests/email';
import { editUser } from '../requests/edit';

const numberOfUsers = 30

export let options: Options = {
    stages: [
        { duration: '3m', target: numberOfUsers }, // od 0 do numberOfUsers
        { duration: '5m', target: numberOfUsers }, // stały ruch numberOfUsers
        { duration: '3m', target: 0 }, // od numberOfUsers do 0
    ],
    thresholds: {
        checks: ['rate>0.9'],
    }
};

// To flow uzytkownika pokrywa 80% + najpopularniejszych zapytań do naszej aplikacji
export default () => {
    // given
    const user = getRandomUser()
    const email = getRandomEmailTo(user.email)

    // when
    register(user)
    sleep(3)
    const token = login(user)
    executeNTimes(() => checkGetAllUsers(token), 4)
    executeNTimes(() => checkGetSingleUser(token, user.username), 3)
    executeWithProbability(() => checkGetMe(token), 0.5)
    executeWithProbability(() => editUser(token, user.username), 0.25)
    executeNTimes(() => sendEmail(email), 2)
};

const executeNTimes = (fn: Function, n: number) => {
    for (let i = 0; i < Math.floor(n); i++) {
        sleep(2)
        fn();
    }
}

const executeWithProbability = (fn: Function, p: number) => {
    if (Math.random() < p) {
        sleep(2)
        fn()
    }
}

export function handleSummary(data: any) {
    return {
        "result.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
