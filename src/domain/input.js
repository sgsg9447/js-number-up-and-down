import { readLineAsync } from '../utils/inputHandler.js';
import { checkGuessNumber } from '../view/index.js';
import { askToPlayAgain } from '../index.js';

export const createGameSetting = () => {
  let minNumber = null;
  let maxNumber = null;
  let playNumber = null;

  return {
    askToMinMaxNumber: async () => {
      console.log(
        '[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)'
      );
      const minAndMaxNumber = await readLineAsync('숫자 입력:');
      if (!minAndMaxNumber.includes(',')) {
        console.log('숫자 입력이 잘못되었습니다. 다시 입력해주세요.');
        return askToMinMaxNumber();
      }
      if (minAndMaxNumber.split(',')[1] === '') {
        console.log('숫자 입력이 잘못되었습니다. 다시 입력해주세요.');
        return askToMinMaxNumber();
      }
      if (minAndMaxNumber.split(',').length !== 2) {
        console.log('숫자 입력이 잘못되었습니다. 다시 입력해주세요.');
        return askToMinMaxNumber();
      }
      [minNumber, maxNumber] = minAndMaxNumber.split(',').map(Number);
      return [minNumber, maxNumber];
    },
    askToPlayNumber: async () => {
      console.log(
        '[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요.'
      );
      playNumber = await readLineAsync('숫자 입력:');
      return Number(playNumber);
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
    checkGuessNumber(userInput, randomNumber, inputValue);
    if (userInput === randomNumber) {
      console.log(
        `축하합니다! ${inputValue.length}번 만에 숫자를 맞추셨습니다.`
      );
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
  };
};

export const generateRandomNumber = (minNumber, maxNumber) => {
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
};
