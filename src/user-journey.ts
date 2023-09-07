import { sleep } from 'k6';
import { Options } from 'k6/options';
import { getRandomUser } from '../utils/user';
import { register } from '../requests/register';
import { login } from '../requests/login';

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
    const registerResponseStatus = register(user)
    
    if (registerResponseStatus === 201) {
        sleep(3)
        login(user)
    }
};
