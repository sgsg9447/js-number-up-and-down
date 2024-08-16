import readLine from 'readline';
import { MIN_NUMBER, MAX_NUMBER } from '../constants/numbers.js';

export function readLineAsync(query) {
  return new Promise((resolve, reject) => {
    if (arguments.length !== 1) {
      reject(new Error('argumnets must be 1'));
    }
    if (typeof query !== 'string') {
      reject(new Error('query must be string'));
    }
    const { stdin, stdout } = process;
    const rl = readLine.createInterface({ input: stdin, output: stdout });

    rl.question(query, (input) => {
      rl.close();
      resolve(input);
    });
  });
}

export async function getUserInput() {
  let input = await readLineAsync('숫자를 입력하세요: ');
  input = parseInt(input, 10);
  if (isNaN(input) || input < MIN_NUMBER || input > MAX_NUMBER) {
    console.log(`${MIN_NUMBER}~${MAX_NUMBER} 사이의 숫자를 입력하세요.`);
    return getUserInput();
  }
  return input;
}
