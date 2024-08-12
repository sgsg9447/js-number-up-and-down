import { MAX_NUMBER, MIN_NUMBER } from '../constants/numbers.js';

export function generateRandomNumber() {
  return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER);
}
