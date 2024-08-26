import {
  askToPlayNumber,
  askToMinMaxNumber,
  displayCongratulation,
  displayWrongInput,
  displayGameOver,
  displayGuessResult,
} from '../view/index.js';

import { askToPlayAgain } from '../index.js';

export const checkGuessNumber = (input, randomNumber) => {
  if (input === randomNumber) {
    return '정답';
  }
  if (input > randomNumber) {
    return '다운';
  }
  if (input < randomNumber) {
    return '업';
  }
};

export const createGameSetting = () => {
  let minNumber = null;
  let maxNumber = null;
  let playNumber = null;

  const validateMinMaxInput = async () => {
    while (true) {
      const minAndMaxNumber = await askToMinMaxNumber();
      const parts = minAndMaxNumber.split(',').map(Number);
      if (parts.length === 2 && !parts.some(isNaN)) {
        [minNumber, maxNumber] = parts;
        return [minNumber, maxNumber];
      } else {
        displayWrongInput();
      }
    }
  };
  return {
    askToMinMaxNumber: async () => {
      return await validateMinMaxInput();
    },
    askToPlayNumber: async () => {
      const playNumber = await askToPlayNumber();
      return playNumber;
    },

    getSettings: () => ({
      minNumber,
      maxNumber,
      playNumber,
    }),
  };
};

export const createGameProcess = (randomNumber, playNumber) => {
  let count = 0;
  const inputValue = [];
  return async function processGuess(userInput) {
    inputValue.push(userInput);
    count++;
    const result = checkGuessNumber(userInput, randomNumber);
    displayGuessResult(result, inputValue);
    if (userInput === randomNumber) {
      displayCongratulation(inputValue.length);
      await askToPlayAgain();
      return true;
    }
    if (count === playNumber) {
      displayGameOver(randomNumber, count);
      await askToPlayAgain();
      return true;
    }
    return false;
  };
};

export const generateRandomNumber = (minNumber, maxNumber) => {
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
};

export const handlePlayAgainYesOrNo = async (playAgainResponse, play) => {
  if (playAgain.toLowerCase() === 'y' || playAgain.toLowerCase() === 'yes') {
    await play();
    return true;
  }
  if (playAgain.toLowerCase() === 'n' || playAgain.toLowerCase() === 'no') {
    return false;
  } else {
    return null;
  }
};
