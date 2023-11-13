import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { jsonHeaders } from "../config/headers";
import { User } from "../domain/register";

export const register = (user: User) => {
    const registerRequest = http.post(`${baseUrl}/users/signup`, JSON.stringify(user), {
        headers: jsonHeaders
    });

    check(registerRequest, {
        'status is 201': () => registerRequest.status === 201,
    });
}