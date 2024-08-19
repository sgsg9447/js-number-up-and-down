import { generateRandomNumber, checkGuessNumber } from './utils/numbers.js';
import { readLineAsync, getUserInput } from './utils/inputHandler.js';

export async function askToPlayAgain() {
  while (true) {
    const playAgain = await readLineAsync(
      '게임을 다시 시작하시겠습니까? (yes/no): '
    );
    if (playAgain.toLowerCase() === 'y' || playAgain.toLowerCase() === 'yes') {
      await play();
      break;
    }
    if (playAgain.toLowerCase() === 'n' || playAgain.toLowerCase() === 'no') {
      console.log('게임을 종료합니다.');
      break;
    } else {
      console.log('yes 또는 no로 입력해주세요.');
    }
  }
}

async function processGuess(
  userInput,
  randomNumber,
  inputValue,
  playNumber,
  count
) {
  if (userInput === randomNumber) {
    console.log(`축하합니다! ${inputValue.length}번 만에 숫자를 맞추셨습니다.`);
    await askToPlayAgain();
    return true;
  }
  if (count === playNumber) {
    console.log(
      `${count}회 초과! 숫자를 맞추지 못했습니다. (정답: ${randomNumber})`
    );
    await askToPlayAgain();
    return true;
  }
  return false;
}

const askToMinMaxNumber = async () => {
  console.log(
    '[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)'
  );
  const minAndMaxNumber = await readLineAsync('숫자 입력:');
  if (!minAndMaxNumber.includes(',')) {
    console.log('숫자 입력이 잘못되었습니다. 다시 입력해주세요.');
    return askToMinMaxNumber();
  }
  if (minAndMaxNumber.split(',').length !== 2) {
    console.log('숫자 입력이 잘못되었습니다. 다시 입력해주세요.');
    return askToMinMaxNumber();
  }
  const [minNumber, maxNumber] = minAndMaxNumber.split(',').map(Number);
  return [minNumber, maxNumber];
};

const askToPlayNumber = async () => {
  console.log('[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요.');
  const playNumber = await readLineAsync('숫자 입력:');
  return Number(playNumber);
};

async function play() {
  const [minNumber, maxNumber] = await askToMinMaxNumber();
  const randomNumber = generateRandomNumber(minNumber, maxNumber);
  const playNumber = await askToPlayNumber();
  console.log(
    `[게임 시작] ${minNumber}~${maxNumber} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`
  );
  const inputValue = [];
  for (let count = 1; count <= playNumber; count++) {
    const userInput = await getUserInput(minNumber, maxNumber);
    inputValue.push(userInput);
    checkGuessNumber(userInput, randomNumber, inputValue);
    const gameEnded = await processGuess(
      userInput,
      randomNumber,
      inputValue,
      playNumber,
      count
    );
    if (gameEnded) {
      break;
    }
  }
}

play();
