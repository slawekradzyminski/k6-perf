import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { UpdateRequest } from "../domain/editTypes";
import { User } from "../domain/registerTypes";
import { Roles } from "../domain/roles";
import { authHeaders } from "../http/headers";
import { getRandomEmail, getRandomString } from "../util/random";

const putRequest = (user: User) => {
    const newBody: UpdateRequest = {
        username: user.username,
        firstName: getRandomString(),
        lastName: getRandomString(),
        email: getRandomEmail(),
        roles: [Roles.ROLE_ADMIN]
    }
    return JSON.stringify(newBody)
}

export const updateUser = (user: User, token: string) => {
    const updateResult = http.put(`${baseUrl}/users/${user.username}`, putRequest(user), {
        headers: authHeaders(token)
    })

    check(updateResult, {
        'update status is 200': () => updateResult.status === 200,
    });
}