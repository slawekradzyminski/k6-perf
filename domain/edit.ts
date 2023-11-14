import { Roles } from "../enums/roles";

export interface EditRequest {
    roles: Roles[],
    username: string,
    firstName: string,
    lastName: string,
    email: string
}