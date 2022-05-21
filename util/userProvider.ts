import { SharedArray } from "k6/data";
import { getRandomIndex } from "./random";

type JsonUser = {
    username: string,
    password: string
}

const usersData = new SharedArray('users', () => {
  return JSON.parse(open('./users.json')).users;
});

export const getRandomUser = (): JsonUser => {
    return usersData[getRandomIndex(usersData.length)] as JsonUser
}