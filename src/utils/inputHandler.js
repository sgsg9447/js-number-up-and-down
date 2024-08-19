import readLine from 'readline';

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

export async function getUserInput(minNumber, maxNumber) {
  const input = parseInt(await readLineAsync('숫자를 입력하세요: '));
  if (isNaN(input) || input < minNumber || input > maxNumber) {
    console.log(`${minNumber}~${maxNumber} 사이의 숫자를 입력하세요.`);
    return getUserInput(minNumber, maxNumber);
  }
  return input;
}
