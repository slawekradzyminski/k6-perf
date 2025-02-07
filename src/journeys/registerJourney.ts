import { sleep } from 'k6';
import { randomIntBetween } from '../../util/randomUtil';
import { getRandomUser } from '../../generators/userGenerator';
import { register } from '../../http/postSignUp';

export const registerJourney = () => {
  const user = getRandomUser()
  register(user)
  sleep(randomIntBetween(1, 10))
};
