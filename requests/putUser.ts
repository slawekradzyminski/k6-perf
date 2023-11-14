import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { authHeaders } from "../config/headers";
import { User } from "../domain/register";
import { getRandomUser } from "../generators/user";

export const edit = (token: string, user: User) => {
    const response = http.put(`${baseUrl}/users/${user.username}`, JSON.stringify(getEditBody(user)), {
        headers: authHeaders(token)
    });

    check(response, {
        '[Edit] status is 200': () => response.status === 200,
    });
}

const getEditBody = (user: User) => {
    const newUser = getRandomUser()
    return {
        roles: user.roles,
        username: user.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email
    }
}