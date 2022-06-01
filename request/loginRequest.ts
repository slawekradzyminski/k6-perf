import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { User } from "../domain/registerTypes";
import { jsonHeaders } from "../http/headers";

const loginRequest = (user: User) => {
    const body = {
        username: user.username,
        password: user.password
    }
    return JSON.stringify(body)
}

export const login = (user: User) => {
    const loginResult = http.post(`${baseUrl}/users/signin`, loginRequest(user), {
        headers: jsonHeaders
    })

    check(loginResult, {
        'login status is 200': () => loginResult.status === 200,
    });
}