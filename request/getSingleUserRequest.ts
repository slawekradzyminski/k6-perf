import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { UserResponse } from "../domain/userTypes";
import { authHeaders } from "../http/headers";

export const getSingleUser = (username: string, token: string) => {
    const getSingleUserResult = http.get(`${baseUrl}/users/${username}`, {
        headers: authHeaders(token)
    })

    const userResponse = getSingleUserResult.json() as UserResponse

    check(getSingleUserResult, {
        'get single status is 200': () => getSingleUserResult.status === 200,
        'correct user returned': () => userResponse.username === username
    });
}