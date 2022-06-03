import { Options } from 'k6/options';
import { loginAsAdmin } from '../request/loginRequest';

export const options: Options = {
  vus: 1,
  iterations: 1
};


export default () => {
    const login = process.env.ADMIN_LOGIN as string
    const password = process.env.ADMIN_PASSWORD as string
    const token = loginAsAdmin(login, password)
    // const users = getAllUsers()
    // users.forEach(user => {
        // if (user.username !== 'admin') {
            // deleteUser(user.username, token)
        // }
    // })
    console.log(token)

};
