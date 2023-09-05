import { Roles } from "./roles"

export type RegisterRequest = {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    roles: Roles[]
  }