import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";

export const refreshToken = (token: string) => {
    const tokenRefreshResult = http.get(`${baseUrl}/users/refresh`, {
        headers: {
            'Accept': '*/*',
            'Authorization': `Bearer ${token}`
        }
    })

    const newToken = tokenRefreshResult.body as string

    check(tokenRefreshResult, {
        'refresh token status is 200': () => tokenRefreshResult.status === 200,
        'token was refreshed': () => newToken.length > 0
    });

    return newToken
}