import { Roles } from "../domain/enums/roles";
import { RegisterRequest } from "../domain/interfaces/register";
import { getRandomEmail, getRandomString } from "./random";

export const getRandomUser = (): RegisterRequest => {
    return {
        username: getRandomString(),
        firstName: getRandomString(),
        lastName: getRandomString(),
        password: getRandomString(),
        email: getRandomEmail(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}