import { Roles } from "../enums/roles";

export interface RegisterRequest {
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
    roles: Roles[]
}

export interface User extends RegisterRequest { 
    
}