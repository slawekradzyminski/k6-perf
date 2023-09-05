import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { authHeaders } from "../http/headers";

export const getAllUsers = (token: string) => {
    const getAllUsersResult = http.get(`${baseUrl}/users`, {
        headers: authHeaders(token)
    })

    check(getAllUsersResult, {
        'get all users status is 200': () => getAllUsersResult.status === 200,
    });
}
