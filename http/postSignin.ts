import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { jsonHeaders } from "../config/headers";
import { User } from "../domain/register";
import { LoginResponse } from "../domain/login";

export const login = (user: User) => {
    return loginAs(user.username, user.password)
}

export const loginAs = (username: string, password: string) => {
    const response = http.post(`${baseUrl}/users/signin`, getLoginBody(username, password), {
        headers: jsonHeaders,
        tags: {
            get: "false",
        }
    });

    const loginResponse = response.json() as unknown as LoginResponse

    check(response, {
        'login status is 200': () => response.status === 200,
        'token present in login response': () => tokenPresentInResponse(loginResponse.token)
    });

    return loginResponse.token
}

const getLoginBody = (username: string, password: string) => {
    return JSON.stringify({ username, password })
}

const tokenPresentInResponse = (token: string) => typeof token !== "undefined";
