import { User } from "../domain/registerTypes";
import { faker } from "@faker-js/faker";

export const getRandomUser = (): User => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const roleOptions = [
    ["ROLE_ADMIN"],
    ["ROLE_CLIENT"],
    ["ROLE_ADMIN", "ROLE_CLIENT"]
  ];
  
  return {
    username: faker.internet.username({ firstName, lastName }).padEnd(4, "123"),
    email: faker.internet.email({ firstName, lastName, provider: "example.com" }),
    password: faker.internet.password({ length: 10 }),
    roles: faker.helpers.arrayElement(roleOptions),
    firstName: firstName.length < 4 ? firstName.padEnd(4, "a") : firstName,
    lastName: lastName.length < 4 ? lastName.padEnd(4, "a") : lastName,
  };
};
