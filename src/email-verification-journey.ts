import { Options } from 'k6/options';
import { verifyEmailsArrived } from '../requests/postprocessing/emailVerifier';

export let options: Options = {
    vus: 1,
    iterations: 1,
    thresholds: {
        checks: ['rate>0.9'],
    }
};

export default () => {
    verifyEmailsArrived()
};

