import { check } from "k6";
import http from "k6/http";
import { BASE_URL } from "../config/constants";
import { params } from "../config/httpConfig";
import { User } from "../domain/registerTypes";

export const register = (user: User) => {
  const url = `${BASE_URL}/users/signup`;
  const body = JSON.stringify(user);

  const res = http.post(url, body, params);

  check(res, {
    "register response status is 201": (r) => r.status === 201
  });
};