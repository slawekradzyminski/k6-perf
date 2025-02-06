import { sleep } from 'k6';
import { Options } from 'k6/options';
import { login } from '../http/postSignIn';
import { getRandomUser } from '../generators/userGenerator';
import { register } from '../http/postSignUp';
import { getMe } from '../http/getMe';
import { getProducts } from '../http/getProducts';
import { getUsers } from '../http/getUsers';
import { getRandomProduct } from '../util/randomProductUtil';
import { addProductToCart } from '../http/addProductToCart';
import { getCart } from '../http/getCart';

export let options:Options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    checks: [
      {
        threshold: 'rate == 1',
        abortOnFail: false,
        delayAbortEval: '4s'
      },
    ],
  },
};

export default () => {
  const user = getRandomUser()

  register(user)
  sleep(3)
  const token = login(user.username, user.password)
  sleep(1);
  getMe(token)
  sleep(2)
  const products = getProducts(token)
  sleep(2)
  getUsers(token)
  sleep(2)
  const product1 = getRandomProduct(products)
  addProductToCart(product1, token)
  sleep(2)
  const product2 = getRandomProduct(products)
  addProductToCart(product2, token)
  sleep(2)
  getCart(token)
};
