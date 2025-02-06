import { check } from "k6";
import http from "k6/http";
import { backendUrl } from "../config/constants";
import { authParams } from "../config/httpConfig";
import { Product } from "../types/productTypes";

export const getProducts = (token: string): Product[] => {
  const res = http.get(`${backendUrl}/api/products`, authParams(token));
  check(res, {
    'get products status is 200': () => res.status === 200,
    // @ts-ignore
    'get products returned at least 5 users': () => res.json().length > 5
  });

  return res.json() as unknown as Product[];
}