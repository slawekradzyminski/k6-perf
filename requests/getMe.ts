import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { authHeaders } from "../http/headers";

export const checkGetMe = (token: string) => {
    const response = http.get(`${baseUrl}/users/me`, {
        headers: authHeaders(token)
    });
    
    check(response, {
        'get me status is 200': () => response.status === 200,
    })
}