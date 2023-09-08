import { check } from "k6";
import http from "k6/http";
import { jsonHeaders } from "../../http/headers";


export const verifyEmailsArrived = () => {
    const response = http.get(`http://localhost:8025/api/v2/messages`, {
        headers: jsonHeaders
    });
    
    check(response, {
        'send email status is 200': () => response.status === 200,
        // @ts-ignore
        'emails are present': () => response.json().total > 190
    })
}

