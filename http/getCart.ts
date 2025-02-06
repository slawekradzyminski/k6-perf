import { check } from "k6";
import http from "k6/http";
import { backendUrl } from "../config/constants";
import { authParams } from "../config/httpConfig";

export const getCart = (token: string) => {
  const res = http.get(`${backendUrl}/api/cart`, authParams(token));
  check(res, {
    'get cart status is 200': () => res.status === 200,
    // @ts-ignore
    'cart has 2 items': () => res.json().totalItems === 2
  });
}