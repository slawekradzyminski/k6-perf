import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { UserResponse } from "../domain/userTypes";
import { authHeaders } from "../http/headers";

export const getAllUsers = (token: string) => {
    const getAllUsersResult = http.get(`${baseUrl}/users`, {
        headers: authHeaders(token)
    })

    check(getAllUsersResult, {
        'get all users status is 200': () => getAllUsersResult.status === 200,
    });

    return getAllUsersResult.json() as UserResponse[]
}
