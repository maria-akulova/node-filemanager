import * as os from 'node:os';
import { rl, exitGracefully } from '../../index.js';
import { navigationHandler } from './navigation.js';
import { invalidInput, unexpectedError } from '../utils/messages.js';
import { filesHandler } from './files.js';
import { sysOperations } from './sysoperation.js';
import { hashCalc } from './hashCalc.js';

const homeDirectory = os.homedir();
process.chdir(homeDirectory);

const displayCurrentDirectory = () => {
  console.log(`You are currently in ${process.cwd()}`);
};

const handleInput = async (input) => {
  input = input.trim();
  const currentDirectory = process.cwd();
  const [command, ...params] = input.trim().split(' ');
  try {
    switch (command) {
      case '.exit':
        exitGracefully();
        break;
      case 'pwd':
        console.log(currentDirectory);
        break;
      case 'up':
      case 'cd':
      case 'ls':
        navigationHandler(command, params);
        break;
      case 'cat':
      case 'add':
      case 'rn':
      case 'cp':
      case 'mv':
      case 'rm':
        filesHandler(command, params);
        break;
      case 'os':
        sysOperations(params);
        break;
      case 'hash':
        hashCalc(params);
        break;
      default:
        invalidInput(command);
    }
  } catch (err) {
    unexpectedError(input, err);

  }
  promptUser();
};

export const promptUser = async () => {
  displayCurrentDirectory(process.cwd());
  const input = await rl.question('> ');
  await handleInput(input);
};
