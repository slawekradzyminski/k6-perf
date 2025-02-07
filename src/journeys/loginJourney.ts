import { sleep } from 'k6';
import { login } from '../../http/postSignIn';
import { getMe } from '../../http/getMe';
import { getProducts } from '../../http/getProducts';
import { getUsers } from '../../http/getUsers';
import { getRandomProduct } from '../../util/randomProductUtil';
import { addProductToCart } from '../../http/addProductToCart';
import { getCart } from '../../http/getCart';
import { repeat, runWithProbability } from '../../util/requestUtil';
import { randomIntBetween } from '../../util/randomUtil';
import { getProductById } from '../../http/getProductById';
import { SharedArray } from 'k6/data';
import Papa from 'papaparse';
import { scenario } from 'k6/execution';
import { User } from '../../types/registerTypes';
import { deleteCart } from '../../http/deleteCart';

const usersData = new SharedArray('users', function () {
  return Papa.parse(open('./loadTestUsers.csv'), { header: true }).data;
});

export const loginJourney = () => {
  const user = usersData[getUserRow()] as User

  const token = login(user.username, user.password)
  sleep(1)
  repeat(() => getMe(token), 2)
  runWithProbability(() => getUsers(token), 0.5)
  repeat(() => deleteCart(token), 1)
  repeat(() => getProductsAndAddToCart(token), 2)

  repeat(() => getCart(token), 3)
};

const getProductsAndAddToCart = (token: string) => {
  const products = getProducts(token)
  sleep(randomIntBetween(1, 4))
  const product = getRandomProduct(products)
  addProductToCart(product, token)
  sleep(4)
  getProductById(product.id, token)
}

const getUserRow = () => {
  const { iterationInTest } = scenario;
  return iterationInTest % 500;
};
