import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { jsonHeaders } from "../config/headers";
import { User } from "../domain/register";

export const login = (user: User) => {
    const response = http.post(`${baseUrl}/users/signin`, getLoginBody(user), {
        headers: jsonHeaders,
    });

    check(response, {
        'login status is 200': () => response.status === 200,
        'token present in login response': () => tokenPresentInResponse(response)
    });

    // @ts-ignore
    return response.json().token
}

const getLoginBody = (user: User) => {
    return JSON.stringify({
        username: user.username,
        password: user.password
    })
}

// @ts-ignore
const tokenPresentInResponse = (response) => typeof response.json().token !== "undefined";
