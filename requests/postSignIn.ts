import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { jsonHeaders } from "../config/headers";
import { LoginRequest } from "../domain/login";
import { User } from "../domain/register";

const getLoginBody = (user: User): LoginRequest => {
    return {
        username: user.username,
        password: user.password
    }
}

// @ts-ignore
const tokenPresentInResponse = (loginResponse) => {
    return typeof (loginResponse.json().token) !== 'undefined'
}

export const login = (user: User): string => {
    const response = http.post(`${baseUrl}/users/signin`, JSON.stringify(getLoginBody(user)), {
        headers: jsonHeaders
    });

    check(response, {
        'login status is 200': () => response.status === 200,
        'token present in login response': () => tokenPresentInResponse(response)
    });

    // @ts-ignore
    return response.json().token
}