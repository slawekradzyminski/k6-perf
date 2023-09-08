import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { authHeaders } from "../http/headers";

export const checkGetSingleUser = (token: string, username: string) => {
    const response = http.get(`${baseUrl}/users/${username}`, {
        headers: authHeaders(token)
    });
    
    check(response, {
        'get single user status is 200': () => response.status === 200,
    })
}