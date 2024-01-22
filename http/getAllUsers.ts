import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { getAuthHeaders } from "../config/headers";

export const getAllUsers = (token: string) => {
    const response = http.get(`${baseUrl}/users`, {
        headers: getAuthHeaders(token)
    })

    check(response, {
        'get all users status is 200': () => response.status === 200,
    });
}