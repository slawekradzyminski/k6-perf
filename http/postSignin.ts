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
    });
}

const getLoginBody = (user: User) => {
    return JSON.stringify({
        username: user.username,
        password: user.password
    })
}