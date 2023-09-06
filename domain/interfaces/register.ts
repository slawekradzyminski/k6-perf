import { Roles } from "../enums/roles";

export interface RegisterRequest {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    roles: Roles[],
    email: string
}
