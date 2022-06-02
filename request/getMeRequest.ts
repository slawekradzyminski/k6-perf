import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { UserResponse } from "../domain/userTypes";
import { authHeaders } from "../http/headers";

export const getMe = (email: string, token: string) => {
    const getMeResult = http.get(`${baseUrl}/users/me`, {
        headers: authHeaders(token)
    })

    const meResponse = getMeResult.json() as UserResponse

    check(getMeResult, {
        'get me status is 200': () => getMeResult.status === 200,
        'correct email returned be me endpoint': () => meResponse.email === email
    });
}