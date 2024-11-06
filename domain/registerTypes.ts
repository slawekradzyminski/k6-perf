export interface User {
  username: string;
  email: string;
  password: string;
  roles: string[];
  firstName: string;
  lastName: string;
}

export interface RegisterRequest extends User {}
