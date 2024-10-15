import { readFile, writeFile, rename, rm } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir, userInfo, cpus, EOL, arch } from 'node:os';

const printEOL = () => {
  console.log(`default system End-Of-Line is ${JSON.stringify(EOL)}`);
}

export const sysOperations = (params) => {
  const [arg] = params;
  if (!arg) {
    console.warn(`Invalid operation: argument is invalid`);
    return;
  } else {
    const searchArg = arg.slice(2);
    try {
      switch (searchArg) {
        case 'EOL':
          printEOL();
          break;
        case 'cpus':
          start(getFilePath(params));
          break;
        case 'homedir':
          start(params);
          break;
        case 'username':
          start(params);
          break;
        case 'architecture':
          start(params);
          break;

        default:
          invalidInput(command);
      }

    } catch (error) {
      unexpectedError(command, error);
    }
  }


}