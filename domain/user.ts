import { Roles } from "../enums/roles";

export interface UserResponse {
    id: number,
    firstName: string,
    lastName: string,
    roles: Roles[],
    email: string,
    username: string
}