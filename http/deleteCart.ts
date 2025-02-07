import { check } from "k6";
import http from "k6/http";
import { backendUrl } from "../config/constants";
import { authParams } from "../config/httpConfig";

export const deleteCart = (token: string) => {
  const res = http.del(`${backendUrl}/api/cart`, undefined, authParams(token));
  check(res, {
    'delete cart status is 200': () => res.status === 200,
  });
}