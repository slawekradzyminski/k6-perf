import { sleep } from 'k6';
import { Options } from 'k6/options';
import { getRandomUser } from '../utils/user';
import { register } from '../requests/register';
import { login } from '../requests/login';
import { checkGetAllUsers } from '../requests/getAllUsers';
import { checkGetSingleUser } from '../requests/getSingleUser';
import { checkGetMe } from '../requests/getMe';

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
