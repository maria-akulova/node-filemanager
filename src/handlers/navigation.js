import { readdir } from 'node:fs/promises';
import { unexpectedError, invalidInput } from '../utils/messages.js';
import { dirname, normalize } from 'node:path';


const toParentFolder = () => {
  try {
    const parentFolder = dirname(process.cwd());
    process.chdir(parentFolder);
  } catch (error) {
    console.error(`Operation failed: ${input}.\nYou could not change working directory. `, err);
  }
}

const toFolder = (params) => {
  try {
    const [dest] = params;
    const destPath = normalize(dest);
    process.chdir(destPath);
  } catch (error) {
    console.error(`Operation failed.\nYou could not move to the ${params} directory. `, error);

  }
}

async function showFolderContent() {
  try {
    const directory = process.cwd();
    const files = await readdir(directory, { withFileTypes: true });

    const folders = files.filter(file => file.isDirectory()).map(folder => folder.name);
    const regularFiles = files.filter(file => file.isFile()).map(file => file.name);

    folders.sort();
    regularFiles.sort();

    console.log('Type\t\tName');
    folders.forEach(folder => console.log('Folder\t\t' + folder));
    regularFiles.forEach(file => console.log('File\t\t' + file));
  } catch (err) {
    console.error('Error reading directory:', err);
  }
}

export const navigationHandler =
  (command, params) => {
    try {
      switch (command) {
        case 'up':
          toParentFolder();
          break;
        case 'cd':
          toFolder(params);
          break;
        case 'ls':
          showFolderContent();
          break;
        default:
          invalidInput(command);
      }

    } catch (error) {
      unexpectedError(command, error);
    }
  }