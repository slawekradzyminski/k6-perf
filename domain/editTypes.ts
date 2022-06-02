import { Roles } from "./roles"

export type UpdateRequest = {
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    roles: Roles[]
}