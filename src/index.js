import { MAX_NUMBER, MIN_NUMBER } from './constants/numbers.js';
import { generateRandomNumber, checkGuessNumber } from './utils/numbers.js';
import { readLineAsync } from './utils/readLineAsync.js';

async function play() {
  const randomNumber = generateRandomNumber();
  console.log(randomNumber);
  console.log('컴퓨터가 1~50 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.');
  const inputValue = [];
  let count;
  for (count = 4; count >= 0; count--) {
    let input = await readLineAsync('숫자를 입력하세요: ');
    input = parseInt(input, 10);
    inputValue.push(input);
    if (isNaN(input) || input < MIN_NUMBER || input > MAX_NUMBER) {
      console.log('1~50 사이의 숫자를 입력하세요.');
      inputValue.pop();
      continue;
    }
    checkGuessNumber(input, randomNumber, inputValue);
    if (input === randomNumber) {
      break;
    }
  }
}

play();
