import {
  createGameSetting,
  createGameProcess,
  generateRandomNumber,
  handleGameDecision,
} from './domain/index.js';
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

// TODO 도메인로직으로 분리하기...
export const askToPlayAgain = async () => {
  while (true) {
    const playAgain = await askRestartGame();
    const decision = await handleGameDecision(playAgain);
    if (decision) {
      await play();
      break;
    }
    if (!decision) {
      displayGameEnd();
      break;
    } else {
      displayYesOrNo();
    }
  }
};

play();
