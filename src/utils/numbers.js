import { MAX_NUMBER, MIN_NUMBER } from '../constants/numbers.js';

export function generateRandomNumber() {
  return Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER) + MIN_NUMBER);
}

export function checkGuessNumber(input, randomNumber) {
  if (input === randomNumber) {
    console.log('정답');
    return '정답';
  }
  if (input > randomNumber) {
    console.log('다운');
    return '다운';
  }
  if (input < randomNumber) {
    console.log('업');
    return '업';
  }
}
