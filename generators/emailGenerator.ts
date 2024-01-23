import { Email } from "../domain/email"
import { getRandomString } from "../utils/random"

export const getRandomEmailTo = (email: string, prefix: string): Email => {
    return {
        subject: `${prefix}-${getRandomString()}`,
        message: getRandomString(),
        to: email
    }
}