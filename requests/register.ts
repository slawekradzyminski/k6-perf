import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { User } from "../domain/user";
import { jsonHeaders } from "../http/headers";

export const registerUser = (user: User) => {
    const registerRequestBody = () => {
        const jsonBody = {
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          password: user.password,
          email: user.email,
          roles: user.roles
        }
        return JSON.stringify(jsonBody)
      }
    
      const registerResponse = http.post(`${baseUrl}/users/signup`, registerRequestBody(), {
        headers: jsonHeaders
      });
    
      check(registerResponse, {
        'register status is 201': r => r.status === 201,
      });
}