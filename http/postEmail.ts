import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { jsonHeaders } from "../config/headers";
import { getRandomEmailTo } from "../generators/emailGenerator";

export const sendEmail = (email: string) => {
    const response = http.post(`${baseUrl}/email`, JSON.stringify(getRandomEmailTo(email)), {
        headers: jsonHeaders,
        tags: {
            get: "false",
        }
    });

    check(response, {
        'send email status is 200': () => response.status === 200,
    });
}
