import { User } from "../domain/register"
import { Roles } from "../domain/roles"
import { getRandomEmail, getRandomString } from "../utils/random"

export const getRandomUser = (): User => {
    return {
        username: getRandomString(),
        password: getRandomString(),
        firstName: getRandomString(),
        lastName: getRandomString(),
        email: getRandomEmail(),
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}