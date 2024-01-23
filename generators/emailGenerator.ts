import { Email } from "../domain/email"
import { getRandomString } from "../utils/random"

export const getRandomEmailTo = (email: string): Email => {
    return {
        subject: getRandomString(),
        message: getRandomString(),
        to: email
    }
}