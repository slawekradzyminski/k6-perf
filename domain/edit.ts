import { Roles } from "./roles";

export interface EditUserRequest {
    firstName: string,
    lastName: string,
    email: string,
    roles: Roles[],
    username: string
}