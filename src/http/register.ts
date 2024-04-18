import { check } from "k6";
import http from "k6/http";

export const register = () => {
    const username = `user_${randomString(10)}`;
    const email = `${username}@example.com`;
    const password = 'password';
    const roles = ["ROLE_ADMIN"];
    const firstName = 'John';
    const lastName = 'Doee';

    const signupUrl = 'http://localhost:4001/users/signup';
    const signupPayload = JSON.stringify({
        username,
        email,
        password,
        roles,
        firstName,
        lastName,
    });

    const signupParams = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const signupResponse = http.post(signupUrl, signupPayload, signupParams);

    check(signupResponse, {
        'registration successful': (r) => r.status === 201,
    });

    return { username, password }; // Return the credentials for the login step
};

function randomString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}