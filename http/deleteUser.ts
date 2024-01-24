import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { getAuthHeaders } from "../config/headers";

export const deleteUser = (token: string, username: string) => {
    const deleteResponse = http.del(`${baseUrl}/users/${username}`, {}, {
        headers: getAuthHeaders(token)
    })
    check(deleteResponse, {
        'delete status is 204': () => deleteResponse.status === 204,
    });
}