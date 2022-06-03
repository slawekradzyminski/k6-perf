import { JSONObject, sleep } from 'k6';
import { Options } from 'k6/options';
import { getRandomUser } from '../util/user';
import { register } from '../request/registerRequest';
import { login } from '../request/loginRequest';
import { getAllUsers } from '../request/getAllUsersRequest';
import { getSingleUser } from '../request/getSingleUserRequest';
import { getMe } from '../request/getMeRequest';
// @ts-ignore
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// @ts-ignore
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';
import { refreshToken } from '../request/refreshTokenRequest';
import { updateUser } from '../request/updateUserRequest';
import { repeat } from '../util/requestUtil';

export const options: Options = {
  vus: 1,
  iterations: 1
};

export default () => {
  let token: string
  const user = getRandomUser()

  register(user)
  sleep(5)
  token = login(user)
  sleep(2)
  repeat(() => getAllUsers(token), 3)
  sleep(2)
  repeat(() => getSingleUser(user.username, token), 2)
  sleep(2)
  getMe(user.email, token)
  sleep(2)
  token = refreshToken(token)
  sleep(3)
  updateUser(user, token)
};

export function handleSummary(data: JSONObject) {
  return {
    'summary.html': htmlReport(data),
    'stdout': textSummary(data, { indent: ' ', enableColors: true })
  };
}