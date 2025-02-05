import { check } from "k6";
import http from "k6/http";
import { backendUrl } from "../config/constants";
import { authParams } from "../config/httpConfig";

export const getProducts = (token: string) => {
  const res = http.get(`${backendUrl}/api/products`, authParams(token));
  check(res, {
    'get products status is 200': () => res.status === 200,
    // @ts-ignore
    'get products returned at least 5 users': () => res.json().length > 5
  });

}