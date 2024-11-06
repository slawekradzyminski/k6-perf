import { check } from "k6";
import http from "k6/http";
import { BASE_URL } from "../config/constants";
import { paramsWithAuth } from "../config/httpConfig";

export const getUsers = (token: string) => {
  const url = `${BASE_URL}/users`;
  
  const res = http.get(url, paramsWithAuth(token));

  check(res, {
    "get users response status is 200": (r) => r.status === 200,
    "get users response has users array": (r) => Array.isArray(r.json())
  });

}; 