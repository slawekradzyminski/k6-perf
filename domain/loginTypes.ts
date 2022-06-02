import { Roles } from "./roles"

export type LoginRequest = {
    username: string,
    password: string
}

export type LoginResponse = {
    username: string,
    roles: Roles[],
    firstName: string,
    lastName: string,
    token: string,
    email: string
}