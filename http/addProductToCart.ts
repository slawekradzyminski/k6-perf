import { check } from "k6";
import http from "k6/http";
import { backendUrl } from "../config/constants";
import { authParams } from "../config/httpConfig";
import { AddCartRequest } from "../types/cartTypes";
import { Product } from "../types/productTypes";

export const addProductToCart = (product: Product, token: string) => {
    const quantity = 1
    const addCartRequest: AddCartRequest = {
        productId: product.id,
        quantity: quantity,
        productName: product.name,
        unitPrice: product.price,
        totalPrice: quantity * product.price
    }
    const body = JSON.stringify(addCartRequest)

    const res = http.post(`${backendUrl}/api/cart/items`, body, authParams(token, { checkDuration: 'true' }));
    check(res, {
        'add to cart status is 200': () => res.status === 200,
    });

}