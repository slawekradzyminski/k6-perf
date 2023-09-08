import { Email } from "../domain/interfaces/email"
import { getRandomString } from "./random"

export const getRandomEmailTo = (email: string): Email => {
    return {
        subject: getRandomString(),
        message: getRandomString(),
        to: email
    }
}