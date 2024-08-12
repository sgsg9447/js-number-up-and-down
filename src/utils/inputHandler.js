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
