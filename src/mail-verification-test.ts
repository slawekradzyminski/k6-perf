import { check } from 'k6';
import http from 'k6/http';
import { Options } from 'k6/options';
import { Message } from '../domain/mailhog/messages';

export let options: Options = {
    vus: 1,
    iterations: 1,
};

export default () => {
    // In real world we would read that from file
    const prefix = 'hellok6aswax9egzi'
    const response = http.get(`http://localhost:8025/api/v2/messages?limit=1000`);

    // @ts-ignore
    const message = response.json() as Message

    check(response, {
        'status is 200': () => response.status === 200,
        'all mails present': () => {
            const subjects = message.items
                .map(item => item.Content)
                .map(content => content.Headers)
                .map(header => header.Subject)
                .map(subject => subject[0])
                .filter(subject => subject.startsWith(prefix))
 
            return subjects.length === 4
        }
    });
};


