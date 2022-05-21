import { getRandomEmail, getRandomString } from "../util/random"
import { Roles } from "./roles"

export type User = {
    username: string,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    roles: Roles[]
}

export const getUser = (): User => {
    return {
        username: getRandomString(),
        firstName: getRandomString(),
        lastName: getRandomString(),
        password: getRandomString(),
        email: getRandomEmail(),
        roles: [Roles.ROLE_ADMIN]
    }
}