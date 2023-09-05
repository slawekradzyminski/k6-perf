import { RegisterRequest } from "../domain/registerTypes"
import { Roles } from "../domain/roles"
import { getRandomEmail, getRandomString } from "./random"

export const getRandomUser = (): RegisterRequest => {
    return {
        email: getRandomEmail(),
        username: getRandomString(),
        password: getRandomString(),
        firstName: getRandomString(),
        lastName: getRandomString(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}