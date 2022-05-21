import { Roles } from "./roles"

export type LoginResponse = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    roles: Roles[],
    token: string
}