import { faker } from '@faker-js/faker';
import { Roles, User } from '../types/registerTypes';

export const getRandomUser = (usernamePrefix = ''): User => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        username: usernamePrefix + faker.internet.username({ firstName, lastName }), // min 4 chars
        email: faker.internet.email(),
        password: 'password', // TODO: temp change, remove!
        // password: faker.internet.password(),
        firstName: firstName,
        lastName: lastName,
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}