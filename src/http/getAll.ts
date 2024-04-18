import { check } from "k6";
import http from "k6/http";

export const getAllUsers = (token: string) => {
    const url = 'http://localhost:4001/users';
    
    const params = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    };

    const response = http.get(url, params);

    check(response, {
        'retrieved users successfully': (r) => r.status === 200,
    });

};