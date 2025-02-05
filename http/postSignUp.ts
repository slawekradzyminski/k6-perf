import { check } from "k6";
import http from "k6/http";
import { backendUrl } from "../config/constants";
import { params } from "../config/httpConfig";
import { User } from "../types/registerTypes";

export const register = (user: User) => {
  const registerRequest = JSON.stringify(user)

  const res = http.post(`${backendUrl}/users/signup`, registerRequest, params);
  check(res, {
    'register status is 201': () => res.status === 201,
  });

}