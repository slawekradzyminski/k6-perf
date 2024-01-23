import { Roles } from "./roles"

export interface UserResponse {
    id: number,
    username: string,
    email: string,
    roles: Roles[],
    firstName: string,
    lastName: string
}