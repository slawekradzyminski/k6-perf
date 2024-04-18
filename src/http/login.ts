import { check } from "k6";
import http from "k6/http";

export const login = (username: string, password: string) => {
    const url = 'http://localhost:4001/users/signin';
    const payload = JSON.stringify({
        username,
        password,
    });

    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const response = http.post(url, payload, params);

    check(response, {
        'login successful': (r) => r.status === 200,
    });
};