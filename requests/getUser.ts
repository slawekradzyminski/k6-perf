import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { authHeaders } from "../config/headers";
import { UserResponse } from "../domain/user";

export const getUser = (token: string, username: string) => {
    const response = http.get(`${baseUrl}/users/${username}`, {
        headers: authHeaders(token)
    });

    // @ts-ignore
    const user = response.json() as UserResponse

    check(response, {
        '[Get user] status is 200': () => response.status === 200,
        '[Get user] returned correct user': () => user.username === username
    });
}