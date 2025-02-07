import { Options } from 'k6/options';
import { getRandomUser } from '../generators/userGenerator';
import { register } from '../http/postSignUp';
import { randomIntBetween } from '../util/randomUtil';
import { sleep } from 'k6';

export let options: Options = {
    vus: 10,
    iterations: 10,
    thresholds: {
        checks: [
            {
                threshold: 'rate == 1',
                abortOnFail: false,
                delayAbortEval: '4s'
            },
        ],
    },
};

export default () => {
    for (let i = 0; i < 50; i++) {
        sleep(randomIntBetween(1, 6))
        let user = getRandomUser('LoadTest')
        register(user)
    }
};
