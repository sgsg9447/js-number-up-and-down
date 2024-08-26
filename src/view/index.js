import { readLineAsync } from '../utils/inputHandler.js';

export const checkGuessNumber = (input, randomNumber, inputValue) => {
  if (input === randomNumber) {
    console.log('정답');
    return '정답';
  }
  if (input > randomNumber) {
    console.log('다운');
    console.log(`이전 추측: ${inputValue.join(', ')}`);
    return '다운';
  }
  if (input < randomNumber) {
    console.log('업');
    console.log(`이전 추측: ${inputValue.join(', ')}`);
    return '업';
  }
};

export const getUserInput = async (minNumber, maxNumber) => {
  const input = parseInt(await readLineAsync('숫자를 입력하세요: '));
  if (isNaN(input) || input < minNumber || input > maxNumber) {
    console.log(`${minNumber}~${maxNumber} 사이의 숫자를 입력하세요.`);
    return getUserInput(minNumber, maxNumber);
  }
  return input;
};
