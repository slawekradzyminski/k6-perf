import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { randomUser, User } from "../domain/user";
import { jsonAuthHeaders } from "../http/headers";

export const editUser = (editedUser: User, token: string) => {
    const newUserData = randomUser()

    const editUserBody = () => {
        const jsonBody = {
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
          username: editedUser.username,
          email: newUserData.email,
          roles: editedUser.roles
        }
        return JSON.stringify(jsonBody)
      }
    
      const registerResponse = http.put(`${baseUrl}/users/${editedUser.username}`, editUserBody(), {
        headers: jsonAuthHeaders(token)
      });
    
      check(registerResponse, {
        'edit status is 200': r => r.status === 200,
      });
}