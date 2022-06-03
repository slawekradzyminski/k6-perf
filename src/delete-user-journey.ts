import { sleep } from 'k6';
import { Options } from 'k6/options';
import { deleteUser } from '../request/deleteUser';
import { getAllUsers } from '../request/getAllUsersRequest';
import { loginAsAdmin } from '../request/loginRequest';

export const options: Options = {
  vus: 1,
  iterations: 1
};

export default () => {
    const login = process.env.ADMIN_LOGIN as string
    const password = process.env.ADMIN_PASSWORD as string
    const token = loginAsAdmin(login, password)
    const users = getAllUsers(token)
    users.forEach(user => {
        if (user.username !== login) {
            deleteUser(user.username, token)
            sleep(0.1)
        }
    })

};
