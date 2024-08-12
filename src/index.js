import { MAX_NUMBER, MIN_NUMBER } from './constants/numbers.js';
import { generateRandomNumber, checkGuessNumber } from './utils/numbers.js';
import { readLineAsync } from './utils/readLineAsync.js';

async function play() {
  const randomNumber = generateRandomNumber();
  console.log(randomNumber);
  console.log('컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.');
  while (true) {
    let input = await readLineAsync('숫자를 입력하세요: ');
    input = parseInt(input, 10);
    if (isNaN(input) || input < MIN_NUMBER || input > MAX_NUMBER) {
      console.log('1~50 사이의 숫자를 입력하세요.');
      continue;
    }
    checkGuessNumber(input, randomNumber);
  }
}

play();
