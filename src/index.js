import {
  createGameSetting,
  createGameProcess,
  generateRandomNumber,
} from './domain/index.js';
import { readLineAsync } from './utils/inputHandler.js';
import {
  askUserInput,
  displayMinMaxNumber,
  displayGameEnd,
  askRestartGame,
  displayYesOrNo,
} from './view/index.js';

const play = async () => {
  const gameSettings = createGameSetting();
  const [minNumber, maxNumber] = await gameSettings.askToMinMaxNumber();
  const playNumber = await gameSettings.askToPlayNumber();
  const randomNumber = generateRandomNumber(minNumber, maxNumber);
  displayMinMaxNumber(minNumber, maxNumber);
  const processGuess = createGameProcess(randomNumber, playNumber);
  for (let count = 1; count <= playNumber; count++) {
    const userInput = await askUserInput(minNumber, maxNumber);
    const gameEnded = await processGuess(userInput);
    if (gameEnded) {
      break;
    }
  }
};

export const askToPlayAgain = async () => {
  while (true) {
    const playAgain = await askRestartGame();
    if (playAgain.toLowerCase() === 'y' || playAgain.toLowerCase() === 'yes') {
      await play();
      break;
    }
    if (playAgain.toLowerCase() === 'n' || playAgain.toLowerCase() === 'no') {
      displayGameEnd();
      break;
    } else {
      displayYesOrNo();
    }
  }
};

play();
