import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const getFilePath = (fileName) => {
  const [file] = fileName;
  return join(process.cwd(), file);
}

const readFileContent = async (src) => {
  try {
    const content = await readFile(src, { encoding: 'utf8' });
    console.log(content);
  } catch {
    console.error(`Operation failed: could not read file ${src}`);
  }
};

const createEmptyFile = async (src) => {
  try {
    await writeFile(src, '', { flag: 'wx' });
  } catch {
    console.error(`Operation failed: could not create file ${src}`);
  }
};

export const filesHandler = (command, params) => {
  try {
    switch (command) {
      case 'cat':
        readFileContent(getFilePath(params));
        break;
      case 'add':
        createEmptyFile(getFilePath(params));
        break;
      case 'rn':
        showFolderContent(params);
        break;
      case 'cp':
        toParentFolder(params);
        break;
      case 'mv':
        toFolder(params);
        break;
      case 'rm':
        showFolderContent(params);
        break;
      default:
        invalidInput(command);
    }

  } catch (error) {
    unexpectedError(command, error);
  }
}