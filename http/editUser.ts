import { check } from "k6";
import http from "k6/http";
import { BASE_URL } from "../config/constants";
import { paramsWithAuth } from "../config/httpConfig";
import { getRandomUser } from "../generator/userGenerator";

export const editUser = (username: string, token: string) => {
  const url = `${BASE_URL}/users/${username}`;

  const newUser = getRandomUser();
  const body = {
    email: newUser.email,
    firstName: newUser.firstName,
    roles: newUser.roles,
    lastName: newUser.lastName
  };

  const res = http.put(url, JSON.stringify(body), paramsWithAuth(token));

  check(res, {
    "edit user response status is 200": (r) => r.status === 200
  });
};
