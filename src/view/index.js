import { readLineAsync } from '../utils/inputHandler.js';

export const askUserInput = async (minNumber, maxNumber) => {
  const input = parseInt(await readLineAsync('숫자를 입력하세요: '));
  if (isNaN(input) || input < minNumber || input > maxNumber) {
    console.log(`${minNumber}~${maxNumber} 사이의 숫자를 입력하세요.`);
    return askUserInput(minNumber, maxNumber);
  }
  return input;
};

export const askToMinMaxNumber = async () => {
  console.log(
    '[게임 설정] 게임 시작을 위해 최소 값, 최대 값을 입력해주세요. (예: 1, 50)'
  );
  const minAndMaxNumber = await readLineAsync('숫자 입력:');
  return minAndMaxNumber;
};

export const askToPlayNumber = async () => {
  console.log('[게임 설정] 게임 시작을 위해 진행 가능 횟수를 입력해주세요.');
  const playNumber = await readLineAsync('숫자 입력:');
  return Number(playNumber);
};

export const askRestartGame = async () =>
  await readLineAsync('게임을 다시 시작하시겠습니까? (yes/no): ');

export const displayWrongInput = () => {
  console.log('숫자 입력이 잘못되었습니다. 다시 입력해주세요.');
};

export const displayCongratulation = (count) => {
  console.log(`축하합니다! ${count}번 만에 숫자를 맞추셨습니다.`);
};

export const displayGameOver = (randomNumber, count) => {
  console.log(
    `${count}회 초과! 숫자를 맞추지 못했습니다. (정답: ${randomNumber})`
  );
};

export const displayGuessResult = (result, inputValue) => {
  if (result === '정답') {
    console.log('정답');
  } else if (result === '다운') {
    console.log('다운');
    console.log(`이전 추측: ${inputValue.join(', ')}`);
  } else if (result === '업') {
    console.log('업');
    console.log(`이전 추측: ${inputValue.join(', ')}`);
  }
};

export const displayMinMaxNumber = (minNumber, maxNumber) => {
  console.log(
    `[게임 시작] ${minNumber}~${maxNumber} 사이의 숫자를 선택했습니다. 숫자를 맞춰보세요.`
  );
};

export const displayGameEnd = () => console.log('게임을 종료합니다.');

export const displayYesOrNo = () => console.log('yes 또는 no로 입력해주세요.');
