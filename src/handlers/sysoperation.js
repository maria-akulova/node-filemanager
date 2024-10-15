import { readFile, writeFile, rename, rm } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir, userInfo, availableParallelism, cpus, EOL, arch } from 'node:os';

const printEOL = () => {
  console.log(`default system End-Of-Line is ${JSON.stringify(EOL)}`);
}

const hostCpusInfo = () => {
  console.log(`Amount of CPUS is ${availableParallelism()}`);
  const allCpus = cpus();
  allCpus.map((cpu, index) => console.log(`${index} model: ${cpu.model}, clock rate: ${(cpu.speed / 1000).toFixed(2)} GHz`))
}

const homedirectory = () => {
  console.log(`Home directory is ${homedir}`);
}

const sysUserName = () => {
  const { username } = userInfo();
  console.log(`Current system user name is ${username}`);
}

const architectureCPUS = () => {
  console.log(`operating system CPU architecture is ${arch()}`);
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
          hostCpusInfo();
          break;
        case 'homedir':
          homedirectory();
          break;
        case 'username':
          sysUserName();
          break;
        case 'architecture':
          architectureCPUS();
          break;

        default:
          invalidInput(command);
      }

    } catch (error) {
      unexpectedError(command, error);
    }
  }


}