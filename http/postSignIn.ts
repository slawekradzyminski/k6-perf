import { check } from "k6";
import http from "k6/http";
import { backendUrl } from "../config/constants";
import { params } from "../config/httpConfig";

export const login = (username: string, password: string): string => {
const loginRequest = JSON.stringify({
    username: username,
    password: password
  })

  const res = http.post(`${backendUrl}/users/signin`, loginRequest, params);
  check(res, {
    'login status is 200': () => res.status === 200,
    'login response has token': () => res.json('token') !== undefined
  });

  return res.json('token') as string

}