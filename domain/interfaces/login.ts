import { Roles } from "../enums/roles";

export interface LoginRequest {
    username: string,
    password: string
}

export interface LoginResponse {
    username: string,
    roles: Roles[],
    firstName: string,
    lastName: string,
    token: string,
    email: string
}
