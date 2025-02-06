import { check } from "k6";
import http from "k6/http";
import { backendUrl } from "../config/constants";
import { authParams } from "../config/httpConfig";

export const getUsers = (token: string) => {
  const res = http.get(`${backendUrl}/users`, authParams(token));
  check(res, {
    'get users status is 200': () => res.status === 200,
    // @ts-ignore
    'get users returned at least 5 users': () => res.json().length > 5
  });

}