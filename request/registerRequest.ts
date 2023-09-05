import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { User } from "../domain/registerTypes";
import { jsonHeaders } from "../http/headers";

export const register = (user: User) => {
    const registrationResult = http.post(`${baseUrl}/users/signup`, JSON.stringify(user), {
        headers: jsonHeaders
    })

    check(registrationResult, {
        'registration status is 201': () => registrationResult.status === 201,
    });
}