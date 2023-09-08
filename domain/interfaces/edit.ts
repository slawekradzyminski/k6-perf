import { Roles } from "../enums/roles";

export interface EditRequest {
    username: string,
    firstName: string,
    lastName: string,
    roles: Roles[],
    email: string
}
