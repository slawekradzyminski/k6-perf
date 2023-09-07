import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { jsonHeaders } from "../http/headers";
import { RegisterRequest } from "../domain/interfaces/register";


export const register = (user: RegisterRequest): number => {
    const registerResponse = http.post(`${baseUrl}/users/signup`, JSON.stringify(user), {
        headers: jsonHeaders
    });
    
    check(registerResponse, {
        'register status is 201': () => registerResponse.status === 201
    })

    return registerResponse.status
}

