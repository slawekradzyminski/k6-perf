import { check } from "k6";
import http, { RefinedResponse, ResponseType } from "k6/http";
import { baseUrl } from "../config/constants";
import { getAuthHeaders } from "../config/headers";
import { UserResponse } from "../domain/user";

export const getAllUsers = (token: string) => {
    const response = http.get(`${baseUrl}/users`, {
        headers: getAuthHeaders(token)
    })

    check(response, {
        'get all users status is 200': () => response.status === 200,
        'get all users returned at least one user': () => hasAtLeastOneUser(response)
    });
}

const hasAtLeastOneUser = (response: RefinedResponse<ResponseType | undefined>) => {
    const data = response.json() as unknown as UserResponse[];
    return data.length > 0;
}