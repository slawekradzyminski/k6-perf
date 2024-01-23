import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { jsonHeaders } from "../config/headers";
import { User } from "../domain/register";
import { LoginResponse } from "../domain/login";

export const login = (user: User) => {
    const response = http.post(`${baseUrl}/users/signin`, getLoginBody(user), {
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

const getLoginBody = (user: User) => {
    return JSON.stringify({
        username: user.username,
        password: user.password
    })
}

const tokenPresentInResponse = (token: string) => typeof token !== "undefined";
