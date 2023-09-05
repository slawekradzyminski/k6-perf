import { Roles } from "./roles"

export type UserResponse = {
    email: string
    firstName: string
    id: number
    lastName: string
    roles: Roles[]
    username: string
}