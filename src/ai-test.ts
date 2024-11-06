import { Options } from "k6/options";
import { login } from "../http/login";
import { sleep } from "k6";
import { getRandomUser } from "../generator/userGenerator";
import { register } from "../http/register";

export const options: Options = {
  vus: 1,
  iterations: 1,
};

export default () => {
  const user = getRandomUser();
  register(user);
  sleep(3);
  login(user.username, user.password);
};
