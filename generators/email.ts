import { Email } from "../domain/email";
import { getRandomString } from "./random";

export const generateEmail = (prefix: string, email: string): Email => {
    return {
        to: email,
        subject: `${prefix}-${getRandomString()}`,
        message: getRandomString()
    }
}