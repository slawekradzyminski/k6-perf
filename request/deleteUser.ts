import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { authHeaders } from "../http/headers";

export const deleteUser = (username: string, token: string) => {
    const deleteUserResult = http.del(`${baseUrl}/users/${username}`, {}, {
        headers: authHeaders(token)
    })

    check(deleteUserResult, {
        'delete status is 204': () => deleteUserResult.status === 204,
    });

}