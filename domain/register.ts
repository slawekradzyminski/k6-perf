import { Roles } from "../enums/roles";

export interface UserCredentials {
    username: string,
    password: string
}

export interface RegisterRequest extends UserCredentials {
    email: string,
    firstName: string,
    lastName: string,
    roles: Roles[]
}

export interface User extends RegisterRequest { 

}