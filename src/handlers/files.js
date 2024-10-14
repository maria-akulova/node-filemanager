import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const readFileContent = async (params) => {
  const [dest] = params;
  const src = join(process.cwd(), dest);

  try {
    const content = await readFile(src, { encoding: 'utf8' });
    console.log(content);
  } catch {
    console.error(`Operation failed: could not read file ${src}`);
  }
};

export const filesHandler = (command, params) => {
  try {
    switch (command) {
      case 'cat':
        readFileContent(params);
        break;
      case 'add':
        toFolder(params);
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