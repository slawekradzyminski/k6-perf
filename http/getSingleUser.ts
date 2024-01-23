import { check } from "k6";
import http, { RefinedResponse, ResponseType } from "k6/http";
import { baseUrl } from "../config/constants";
import { getAuthHeaders } from "../config/headers";
import { UserResponse } from "../domain/user";

export const getUserByUsername = (token: string, username: string) => {
    const response = http.get(`${baseUrl}/users/${username}`, {
        headers: getAuthHeaders(token)
    })

    check(response, {
        'get user status is 200': () => response.status === 200,
        'get user returned a user': () => hasUser(response)
    });
}

const hasUser = (response: RefinedResponse<ResponseType | undefined>) => {
    const data = response.json() as unknown as UserResponse;
    return data !== null;
}