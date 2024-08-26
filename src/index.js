import {
  createGameSetting,
  createGameProcess,
  generateRandomNumber,
} from './domain/input.js';
import { readLineAsync } from './utils/inputHandler.js';
import { getUserInput } from './view/index.js';

const play = async () => {
  const gameSettings = createGameSetting();
  const [minNumber, maxNumber] = await gameSettings.askToMinMaxNumber();
  const playNumber = await gameSettings.askToPlayNumber();
  const randomNumber = generateRandomNumber(minNumber, maxNumber);
  console.log(
    `[게임 시작] ${minNumber}~${maxNumber} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`
  );
  const processGuess = createGameProcess(randomNumber, playNumber);
  for (let count = 1; count <= playNumber; count++) {
    const userInput = await getUserInput(minNumber, maxNumber);
    const gameEnded = await processGuess(userInput);
    if (gameEnded) {
      break;
    }
  }
};

export const askToPlayAgain = async () => {
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
};

play();
