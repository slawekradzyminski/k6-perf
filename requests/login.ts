import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { jsonHeaders } from "../http/headers";
import { LoginRequest } from "../domain/interfaces/login";
import { RegisterRequest } from "../domain/interfaces/register";

const loginRequest = (username: string, password: string): LoginRequest => {
    return { username, password }
}

export const login = (user: RegisterRequest) => {
    const loginResponse = http.post(`${baseUrl}/users/signin`, JSON.stringify(loginRequest(user.username, user.password)), {
        headers: jsonHeaders
    });
    check(loginResponse, {
        'status is 200': () => loginResponse.status === 200
    })
}



