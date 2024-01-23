import { check } from 'k6';
import { Options } from 'k6/options';
import http from 'k6/http';
import { jsonHeaders } from '../config/headers';
import { Message } from '../domain/mailhog';

export let options: Options = {
    vus: 1,
    iterations: 1,
    thresholds: {
        checks: ['rate>0.99']
    }
};

export default () => {
    const response = http.get(`http://localhost:8025/api/v2/messages?limit=100`, {
        headers: jsonHeaders,
    });

    const message = response.json() as unknown as Message
    const messageCount = message.items
        .map(item => item.Content)
        .map(content => content.Headers)
        .map(header => header.Subject)
        .map(subject => subject[0])
        .filter(subject => subject.startsWith("k6w84rvq6fxp"))

    check(response, {
        'login status is 200': () => response.status === 200,
        'correct message count': () => messageCount.length === 8
    });
};

