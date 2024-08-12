import { MAX_NUMBER, MIN_NUMBER, MAX_ATTEMPT } from './constants/numbers.js';
import { generateRandomNumber, checkGuessNumber } from './utils/numbers.js';
import { readLineAsync } from './utils/inputHandler.js';

export async function askToPlayAgain() {
  const playAgain = await readLineAsync(
    '게임을 다시 시작하시겠습니까? (yes/no): '
  );
  if (playAgain.toLowerCase() === 'y' || playAgain.toLowerCase() === 'yes') {
    await play();
  }
  if (playAgain.toLowerCase() === 'n' || playAgain.toLowerCase() === 'no') {
    console.log('게임을 종료합니다.');
    process.exit(0);
  } else {
    console.log('yes 또는 no로 입력해주세요.');
    await askToPlayAgain();
  }
}

async function play() {
  const randomNumber = generateRandomNumber();
  console.log(randomNumber);
  console.log(
    `컴퓨터가 ${MIN_NUMBER}~${MAX_NUMBER} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`
  );
  const inputValue = [];
  let count;
  for (count = 1; count <= MAX_ATTEMPT; count++) {
    let input = await readLineAsync('숫자를 입력하세요: ');
    input = parseInt(input, 10);
    inputValue.push(input);
    if (isNaN(input) || input < MIN_NUMBER || input > MAX_NUMBER) {
      console.log(`${MIN_NUMBER}~${MAX_NUMBER} 사이의 숫자를 입력하세요.`);
      inputValue.pop();
      continue;
    }
    checkGuessNumber(input, randomNumber, inputValue);
    if (input === randomNumber) {
      console.log(
        `축하합니다! ${inputValue.length}번 만에 숫자를 맞추셨습니다.`
      );
      await askToPlayAgain();
      break;
    }
    if (count === MAX_ATTEMPT) {
      console.log(
        `${count}회 초과! 숫자를 맞추지 못했습니다. (정답: ${randomNumber})`
      );
      await askToPlayAgain();
    }
  }
}

play();
