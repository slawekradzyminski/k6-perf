import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { jsonHeaders } from "../config/headers";
import { getRandomEmailTo } from "../generators/emailGenerator";
import { Email } from "../domain/email";

export const sendEmail = (email: string, prefix: string) => {
    const emailToSend: Email = getRandomEmailTo(email, prefix)

    const response = http.post(`${baseUrl}/email`, JSON.stringify(emailToSend), {
        headers: jsonHeaders,
        tags: {
            get: "false",
        }
    });

    check(response, {
        'send email status is 200': () => response.status === 200,
    });
}
