import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { authHeaders } from "../config/headers";
import { UserResponse } from "../domain/user";

export const getUsers = (token: string) => {
    const response = http.get(`${baseUrl}/users`, {
        headers: authHeaders(token)
    });

    // @ts-ignore
    const users = response.json() as UserResponse[]

    check(response, {
        'get all users status is 200': () => response.status === 200,
        'get all users returned at least one user': () => users.length > 0
    });
}