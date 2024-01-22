import { Roles } from "./roles";

export interface RegisterRequest {
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    email: string,
    roles: Roles[]
}

export interface User extends RegisterRequest {}