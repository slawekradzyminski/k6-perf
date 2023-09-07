import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { jsonHeaders } from "../http/headers";
import { LoginRequest, LoginResponse } from "../domain/interfaces/login";

const loginRequest = (username: string, password: string): LoginRequest => {
    return { username, password }
}

const tokenPresentInResponse = (loginResponse: LoginResponse) => {
    return typeof(loginResponse.token) !== 'undefined'
}

export const login = (user: LoginRequest): string => {
    const loginResponse = http.post(`${baseUrl}/users/signin`, JSON.stringify(loginRequest(user.username, user.password)), {
        headers: jsonHeaders
    });
    // @ts-ignore
    const loginResponseBody = loginResponse.json() as LoginResponse

    check(loginResponse, {
        'login status is 200': () => loginResponse.status === 200,
        'token present in login response': () => tokenPresentInResponse(loginResponseBody)
    })

    return loginResponseBody.token
}
