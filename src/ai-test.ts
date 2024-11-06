import { Options } from "k6/options";
import { SharedArray } from "k6/data";
import { login } from "../http/login";
import { LoginRequest } from "../domain/loginTypes";

const users = new SharedArray("users", () => {
  return JSON.parse(open("./users.json")).users;
});

export const options: Options = {
  vus: 1,
  iterations: 1,
};

export default () => {
  const user = users[Math.floor(Math.random() * users.length)] as LoginRequest;

  login(user.username, user.password);
};
