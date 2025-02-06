import { sleep } from 'k6';
import { Options } from 'k6/options';
import { login } from '../http/postSignIn';
import Papa from 'papaparse';
import { SharedArray } from 'k6/data';
import { CreateProductRequest } from '../types/productTypes';
import { createProduct } from '../http/postProduct';

const data = new SharedArray('products', function () {
  return Papa.parse(open('./products.csv'), { header: true }).data;
});

export let options: Options = {
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
  const token = login('admin', 'admin')
  sleep(1);
  for (const product of data) {
    createProduct(product as CreateProductRequest, token);
    sleep(1);
  }
};
