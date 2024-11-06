import { Options } from "k6/options";
import { login } from "../http/login";
import { sleep } from "k6";
import { getRandomUser } from "../generator/userGenerator";
import { register } from "../http/register";
import { getUsers } from "../http/getUsers";
import { editUser } from "../http/editUser";
// @ts-ignore
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

const targetLoginRps = 1;

export const options: Options = {
  scenarios: {
    userJourney: {
      executor: "ramping-arrival-rate",
      startRate: 0,
      timeUnit: "1s",
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        { target: targetLoginRps, duration: "2m" }, // ramp up  
        { target: targetLoginRps, duration: "6m" }, // peak
        { target: 0, duration: "2m" }, // ramp down
      ],
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<1000"],
    checks: [{ threshold: "rate>0.99", abortOnFail: true }],
    http_req_failed: ["rate<0.01"],
  },
};

export function handleSummary(data: any) {
  return {
    "summary.html": htmlReport(data),
  };
}

const repeat = (times: number, fn: () => void) => {
  const wholePart = Math.floor(times);
  const fractionalPart = times % 1;
  for (let i = 0; i < wholePart; i++) {
    fn();
  }
  if (Math.random() < fractionalPart) {
    fn();
  }
};

// chcemy obsługiwać 1rps (60rpm)
export default () => {
  const user = getRandomUser();
  register(user); // 1x
  sleep(3);
  const token = login(user.username, user.password); // 1x

  repeat(2, () => {
    sleep(1);
    getUsers(token as string);
  });

  sleep(3);
  repeat(0.5, () => {
    editUser(user.username, token as string);
  });
};
