import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { getAuthHeaders } from "../config/headers";
import { User } from "../domain/register";
import { EditUserRequest } from "../domain/edit";
import { getRandomUser } from "../generators/userGenerator";

export const edit = (token: string, user: User) => {
    const response = http.put(`${baseUrl}/users/${user.username}`, getEditBody(user), {
        headers: getAuthHeaders(token),
    });

    check(response, {
        'edit status is 200': () => response.status === 200,
    });
}

const getEditBody = (user: User) => {
    const newUserDetails = getRandomUser()

    const body: EditUserRequest = {
        username: user.username,
        firstName: newUserDetails.firstName,
        lastName: newUserDetails.lastName,
        email: newUserDetails.email,
        roles: user.roles
    }

    return JSON.stringify(body)
}

