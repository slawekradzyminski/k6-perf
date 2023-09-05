import { Roles } from "./roles"

export type User = {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    roles: Roles[]
  }