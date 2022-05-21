import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { User } from "../domain/user";
import { jsonHeaders } from "../http/headers";

export const loginUser = (user: User) => {
    const loginRequestBody = () => {
        const jsonBody = {
          username: user.username,
          password: user.password
        }
        return JSON.stringify(jsonBody)
      }
    
      const loginResponse = http.post(`${baseUrl}/users/signin`, loginRequestBody(), {
          headers: jsonHeaders
      });
    
      check(loginResponse, {
        'login status is 200': r => r.status === 200,
      });
}