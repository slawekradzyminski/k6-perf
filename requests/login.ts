import { check } from "k6";
import http, { RefinedResponse } from "k6/http";
import { baseUrl } from "../config/constants";
import { LoginResponse } from "../domain/loginResponse";
import { User } from "../domain/user";
import { jsonHeaders } from "../http/headers";

const tokenPresent = (response: RefinedResponse<"text">): boolean => {
  const respBody = response.json() as LoginResponse
  return respBody.token !== undefined
}

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
        'login status is 200': resp => resp.status === 200,
        'login should return jwt token': resp => tokenPresent(resp)
      });

      const loginResponseBody: LoginResponse = loginResponse.json() as LoginResponse
      return loginResponseBody.token
}