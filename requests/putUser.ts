import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { authHeaders } from "../config/headers";
import { User } from "../domain/register";
import { EditRequest } from "../domain/edit";
import { getRandomEmail, getRandomString } from "../generators/random";

export const edit = (token: string, user: User) => {
    const response = http.put(`${baseUrl}/users/${user.username}`, JSON.stringify(getEditBody(user)), {
        headers: authHeaders(token)
    });

    check(response, {
        '[Edit] status is 200': () => response.status === 200,
    });
}

const getEditBody = (user: User): EditRequest => {
    const { password, ...userWithoutPassword } = user;

    return {
        ...userWithoutPassword,
        email: getRandomEmail(),
        firstName: getRandomString(),
        lastName: getRandomString()
    }
}