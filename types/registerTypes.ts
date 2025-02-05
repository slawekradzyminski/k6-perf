export enum Roles {
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_CLIENT = 'ROLE_CLIENT'
}

export interface User {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    roles: Roles[]
}

export interface RegisterRequest extends User {}