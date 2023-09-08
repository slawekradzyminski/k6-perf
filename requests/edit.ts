import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { authHeaders } from "../http/headers";
import { getRandomUser } from "../utils/user";
import { EditRequest } from "../domain/interfaces/edit";
import { Roles } from "../domain/enums/roles";

const buildEditRequest = (username: string): EditRequest => {
    const newUser = getRandomUser()
    return {
        username: username,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}

export const editUser = (token: string, username: string) => {
    const response = http.put(`${baseUrl}/users/${username}`, JSON.stringify(buildEditRequest(username)), {
        headers: authHeaders(token)
    });

    check(response, {
        'edit status is 200': () => response.status === 200
    })
}

