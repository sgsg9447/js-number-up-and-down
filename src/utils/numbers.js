export const generateRandomNumber = (minNumber, maxNumber) => {
  return Math.floor(Math.random() * (maxNumber - minNumber) + minNumber);
};

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
