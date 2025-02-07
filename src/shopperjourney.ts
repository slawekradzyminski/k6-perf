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
import { getProductById } from '../http/getProductById';

// const targetLoginRpm = 60 // dane z NR
// const secondsInMinute = 60
const targetLoginRps = 1 // ta wartość to cel naszego testu (wymaganie jakie chcemy spełnić)
// rps = rpm / 60

export let options:Options = {
  scenarios: {
    contacts: {
      executor: 'ramping-arrival-rate',
      startRate: 0,
      timeUnit: '1s', // jezeli uzywamy rps to dajemy 1s, jezeli uzywamy rpm to dajemy 1m
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        { target: targetLoginRps, duration: '2m' }, // ramp up (zaczynamy od startRate)
        { target: targetLoginRps, duration: '6m' }, // peak traffic (zaczynamy od tego co było targetem poprzedniej fazy)
        { target: 0, duration: '2m' }, // ramp down (zaczynamy od tego co było targetem poprzedniej fazy)
      ],
    },
  },
  thresholds: {
    checks: [
      {
        threshold: 'rate == 1',
        abortOnFail: false,
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
  sleep(4)
  getProductById(product.id, token)
}
