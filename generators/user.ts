import { User } from "../domain/register";
import { Roles } from "../enums/roles";
import { getRandomEmail, getRandomString } from "./random";

export const getRandomUser = (): User => {
    return {
        username: getRandomString(),
        password: getRandomString(),
        firstName: getRandomString(),
        lastName: getRandomString(),
        email: getRandomEmail(),
        roles: [ Roles.ROLE_ADMIN, Roles.ROLE_CLIENT ]
    }
}