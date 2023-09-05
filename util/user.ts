import { User } from "../domain/registerTypes"
import { Roles } from "../domain/roles"
import { getRandomEmail, getRandomString } from "./random"

export const getRandomUser = (): User => {
    return {
        email: getRandomEmail(),
        username: getRandomString(),
        password: getRandomString(),
        firstName: getRandomString(),
        lastName: getRandomString(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}