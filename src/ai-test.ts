import { Options } from "k6/options";
import { login } from "../http/login";
import { sleep } from "k6";
import { getRandomUser } from "../generator/userGenerator";
import { register } from "../http/register";
import { getUsers } from "../http/getUsers";
import { editUser } from "../http/editUser";
// @ts-ignore
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options: Options = {
  vus: 1,
  iterations: 2,
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
  for (let i = 0; i < times; i++) {
    fn();
  }
};

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
  editUser(user.username, token as string); // 0.5
};
