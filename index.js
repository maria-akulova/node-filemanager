import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { exitGracefully, displayCurrentDirectory, welcome } from './src/handlers/general.js';

const rl = readline.createInterface({ input, output });

const args = process.argv.slice(2);
const usernameArg = args.find(arg => arg.startsWith('--username='));
const username = usernameArg ? usernameArg.split('=')[1] : 'Anonymous';

const homeDirectory = os.homedir();
let currentDirectory = homeDirectory;

const handleInput = async (input) => {
  input = input.trim();
  switch (input) {
    case '.exit':
      exitGracefully(rl);
      break;
    case 'pwd':
      console.log(currentDirectory);
      break;
    case 'ls':
      try {
        const files = await fs.readdir(currentDirectory);
        console.log(files.join('\n'));
      } catch (err) {
        console.error('Error reading directory:', err);
      }
      break;
    default:
      console.log('Unknown command. Available commands: .exit, pwd, ls');
  }
  promptUser();
};

const promptUser = async () => {
  displayCurrentDirectory(currentDirectory);
  const input = await rl.question('> ');
  await handleInput(input);
};

welcome(username);
promptUser();

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`);
  exitGracefully(rl);
});
