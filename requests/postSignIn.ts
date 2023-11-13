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

export const login = (user: User) => {
    const loginRequest = http.post(`${baseUrl}/users/signin`, JSON.stringify(getLoginBody(user)), {
        headers: jsonHeaders
    });

    check(loginRequest, {
        'status is 200': () => loginRequest.status === 200,
    });
}