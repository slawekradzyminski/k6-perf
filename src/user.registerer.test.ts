import { Options } from 'k6/options';
import { getRandomUser } from '../generators/userGenerator';
import { register } from '../http/postSignup';

export let options: Options = {
    vus: 1,
    iterations: 1,
    thresholds: {
        checks: ['rate>0.99']
    }
};

export default () => {
    let users = [];
    for(let i = 0; i < 1000; i++) {
        const user = getRandomUser();
        users.push({
            username: user.username,
            password: user.password
        });
        register(user)
    }
    console.log(JSON.stringify(users));
};