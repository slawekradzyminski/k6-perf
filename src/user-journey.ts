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

export let options: Options = {
    vus: 2,
    iterations: 2,
    thresholds: {
        checks: ['rate>0.9'],
    }
};

export default () => {
    // given
    const user = getRandomUser()

    // when
    register(user)
    sleep(3)
    const token = login(user)
    sleep(1)
    checkGetAllUsers(token)
    sleep(2)
    checkGetSingleUser(token, user.username)
    sleep(2)
    checkGetMe(token)
};

export function handleSummary(data: any) {
    return {
        "result.html": htmlReport(data),
        stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
}
