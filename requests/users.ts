import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { jsonAuthHeaders } from "../http/headers";

export const getUsers = (token: string) => {
    const getResponse = http.get(`${baseUrl}/users`, {
        headers: jsonAuthHeaders(token)
    });

    check(getResponse, {
        'get users is 200': r => r.status === 200,
    });
}