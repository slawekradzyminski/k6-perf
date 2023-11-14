import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { authHeaders } from "../config/headers";
import { generateEmail } from "../generators/email";

export const sendEmail = (token: string, email: string, prefix: string) => {
    const response = http.post(`${baseUrl}/email`,
        JSON.stringify(generateEmail(prefix, email)), {
        headers: authHeaders(token)
    });

    check(response, {
        '[Email] status is 200': () => response.status === 200,
    });
}