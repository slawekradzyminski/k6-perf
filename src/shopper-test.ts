import { Options } from 'k6/options';
import { loginJourney } from './journeys/loginJourney';
import { registerJourney } from './journeys/registerJourney';

const targetLoginRps = 1 

export let options:Options = {
  scenarios: {
    loginTraffic: {
      executor: 'ramping-arrival-rate',
      startRate: 0,
      exec: 'loginTraffic',
      timeUnit: '1s', 
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        { target: targetLoginRps, duration: '2m' }, 
        { target: targetLoginRps, duration: '6m' }, 
        { target: 0, duration: '2m' }, 
      ],
    },
    registerTraffic: {
      executor: 'constant-vus',
      exec: 'registerTraffic',
      vus: 2,
      duration: '2m',
    },
  },
  thresholds: {
    checks: [
      {
        threshold: 'rate == 1',
        abortOnFail: false,
      },
    ],
  },
  summaryTrendStats: ["min", "avg", "med", "max", "p(95)", "p(99)"],
};

export const loginTraffic = () => {
  loginJourney()
};

export const registerTraffic = () => {
  registerJourney()
};
