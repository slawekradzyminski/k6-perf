import { check } from "k6";
import http from "k6/http";
import { backendUrl } from "../config/constants";
import { authParams } from "../config/httpConfig";

export const getMe = (token: string) => {
  const res = http.get(`${backendUrl}/users/me`, authParams(token));
  check(res, {
    'get me status is 200': () => res.status === 200,
  });

}