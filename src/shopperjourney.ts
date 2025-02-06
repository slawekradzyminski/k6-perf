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
import { repeat, runWithProbability } from '../util/requestUtil';
import { randomIntBetween } from '../util/randomUtil';
// @ts-ignore
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
// @ts-ignore
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options:Options = {
  vus: 10,
  iterations: 50,
  thresholds: {
    checks: [
      {
        threshold: 'rate == 1',
        abortOnFail: false,
        delayAbortEval: '4s'
      },
    ],
  },
  summaryTrendStats: ["min", "avg", "med", "max", "p(95)", "p(99)"],
};

export default () => {
  const user = getRandomUser()

  repeat(() => register(user), 1)
  const token = login(user.username, user.password)
  sleep(1)
  repeat(() => getMe(token), 2)
  runWithProbability(() => getUsers(token), 0.5)
  repeat(() => getProductsAndAddToCart(token), 2)

  repeat(() => getCart(token), 3)
};

const getProductsAndAddToCart = (token: string) => {
  const products = getProducts(token)
  sleep(randomIntBetween(1, 4))
  const product = getRandomProduct(products)
  addProductToCart(product, token) 
}

export function handleSummary(data: any) {
  return {
    "result.html": htmlReport(data),
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };
}
