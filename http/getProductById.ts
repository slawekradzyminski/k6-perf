import { check } from "k6";
import http from "k6/http";
import { backendUrl } from "../config/constants";
import { authParams } from "../config/httpConfig";

export const getProductById = (id: number, token: string) => {
  const res = http.get(`${backendUrl}/api/products/${id}`, authParams(token));
  check(res, {
    'get product by id status is 200': () => res.status === 200,
  });
}