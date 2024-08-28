import readLine from 'readline';

export const readLineAsync = (...args) => {
  return new Promise((resolve, reject) => {
    if (args.length !== 1) {
      reject(new Error('argumnets must be 1'));
    }
    const [query] = args;
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
};
