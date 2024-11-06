import { Options } from "k6/options";
import { login } from "../http/login";

export let options: Options = {
  vus: 1,
  iterations: 1
};

export default () => {
  login("admin", "admin");
};