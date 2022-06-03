import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { LoginResponse } from "../domain/loginTypes";
import { User } from "../domain/registerTypes";
import { jsonHeaders } from "../http/headers";

export const login = (user: User) => handleLogin(user.username, user.password)

export const loginAsAdmin = (username: string, password: string) => handleLogin(username, password)

const loginRequest = (username: string, password: string) => {
    const body = {
        username: username,
        password: password
    }
    return JSON.stringify(body)
}

const tokenPresentInResponse = (loginResponse: LoginResponse) => {
    return typeof(loginResponse.token) !== "undefined"
}

const handleLogin = (username: string, password: string) => {
    const loginResult = http.post(`${baseUrl}/users/signin`, loginRequest(username, password), {
        headers: jsonHeaders
    })
    const loginResponse = loginResult.json() as LoginResponse

    check(loginResult, {
        'login status is 200': () => loginResult.status === 200,
        'token present in login response': () => tokenPresentInResponse(loginResponse)
    });

    return loginResponse.token
}