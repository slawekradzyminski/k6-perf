import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { authHeaders } from "../config/headers";

export const deleteUser = (token: string, username: string) => {
    const response = http.del(`${baseUrl}/users/${username}`, '', {
        headers: authHeaders(token)
    });

    check(response, {
        '[Delete user] status is 204': () => response.status === 204,
    });
}