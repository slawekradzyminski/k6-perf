import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { authHeaders } from "../config/headers";
import { UserResponse } from "../domain/user";

export const getUsers = (token: string): UserResponse[] => {
    const response = http.get(`${baseUrl}/users`, {
        headers: authHeaders(token)
    });

    // @ts-ignore
    const users = response.json() as UserResponse[]

    check(response, {
        '[Get all users] status is 200': () => response.status === 200,
        '[Get all users] returned at least one user': () => users.length > 0
    });

    return users
}