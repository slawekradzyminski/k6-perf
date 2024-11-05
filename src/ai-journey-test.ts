import { login } from "../http/login"
import { SharedArray } from "k6/data";
import { LoginRequest } from "../domain/loginTypes";
import { sleep } from "k6";

const users = new SharedArray('users', function () {
  return JSON.parse(open('./users.json')).users;
});

export const options = {
  vus: 2,
  iterations: 8
};

export default () => {
  const user = users[Math.floor(Math.random() * users.length)] as LoginRequest;
  login(user.username, user.password);
  sleep(1);
};