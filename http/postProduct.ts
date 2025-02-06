import { check } from "k6";
import http from "k6/http";
import { backendUrl } from "../config/constants";
import { authParams } from "../config/httpConfig";
import { CreateProductRequest } from "../types/productTypes";

export const createProduct = (product: CreateProductRequest, token: string) => {
  const body = JSON.stringify(product)

  const res = http.post(`${backendUrl}/api/products`, body, authParams(token));
  check(res, {
    'post product status is 201': () => res.status === 201,
  });

}