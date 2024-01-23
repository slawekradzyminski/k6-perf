import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { getAuthHeaders } from "../config/headers";
import { UserResponse } from "../domain/user";

export const getAllUsers = (token: string) => {
    const response = http.get(`${baseUrl}/users`, {
        headers: getAuthHeaders(token)
    })

    check(response, {
        'get all users status is 200': () => response.status === 200,
        'get all users returned at least one user': () => hasAtLeastOneUser(response)
    });
}

// @ts-ignore
const hasAtLeastOneUser = (response) => {
    const users = response.json() as UserResponse[]
    return users.length > 0
}