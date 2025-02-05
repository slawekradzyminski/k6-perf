import { faker } from '@faker-js/faker';
import { Roles, User } from '../types/registerTypes';

export const getRandomUser = (): User => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
        username: faker.internet.username({ firstName, lastName }), // min 4 chars
        email: faker.internet.email(),
        password: faker.internet.password(),
        firstName: firstName,
        lastName: lastName,
        roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
    }
}