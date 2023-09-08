import { check } from "k6";
import http from "k6/http";
import { baseUrl } from "../config/constants";
import { jsonHeaders } from "../http/headers";
import { Email } from "../domain/interfaces/email";


export const sendEmail = (email: Email) => {
    const response = http.post(`${baseUrl}/email`, JSON.stringify(email), {
        headers: jsonHeaders
    });
    
    check(response, {
        'send email status is 200': () => response.status === 200
    })
}

