import { check } from "k6";
import { BASE_URL } from "../config/constants";
import { params } from "../config/params";
import http from "k6/http";
import { checkResult } from "./util/logger";

const loginEndpoint = `${BASE_URL}/users/signin`;

export const login = (username: string, password: string) => {
  const body = JSON.stringify({
    username: username,
    password: password,
  });

  const response = http.post(loginEndpoint, body, params);

  const status = check(response, {
    "status is 201": (r) => r.status === 201,
    "has JWT token": (r) => r.json("token") !== undefined,
  });

  checkResult(response, status);
};
