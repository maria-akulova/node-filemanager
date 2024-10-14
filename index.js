
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { promptUser } from './src/handlers/general.js';

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
export const name = usernameArg ? usernameArg.split('=')[1] : 'Anonymous';

export const rl = readline.createInterface({ input, output });

export const exitGracefully = () => {
  rl.close();
  process.exit(0);
};

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${name}, goodbye!`);
  exitGracefully();
});


const welcome = () => {
  console.log(`Welcome to the File Manager, ${name}!`);
}

welcome();
promptUser();


