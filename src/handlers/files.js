import { readFile, writeFile, rename, rm } from 'node:fs/promises';
import { pipeline } from 'node:stream/promises';
import { createReadStream, createWriteStream } from 'node:fs';
import { join, resolve } from 'node:path';

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

const renameFile = async (params) => {
  const [currentName, newName] = params;
  const currDir = process.cwd();
  const src = join(currDir, currentName);
  const dist = join(currDir, newName);
  try {
    rename(src, dist)
  } catch {
    console.error(`Operation failed: could not rename file ${src}`);
  }
};

const copyFile = async (params) => {
  const [sourceFile, destFolder] = params;
  if (!sourceFile || !destFolder) {
    console.warn(`Invalid operation: arguments are invalids`);
    return;
  } else {
    try {
      const src = join(process.cwd(), sourceFile);
      const target = resolve(process.cwd(), destFolder);
      const targetPath = join(target, sourceFile);

      const srcStream = createReadStream(src, { encoding: 'utf8' });
      const targetStream = createWriteStream(targetPath);

      await pipeline(srcStream, targetStream);
    } catch {
      console.error(`Operation failed: could not copy file`);
    }
  }
}

const moveFile = async (params) => {

  try {
    await copyFile(params);
    await deleteFile(getFilePath(params));
  } catch {
    console.error(`Operation failed: could not move file`);
  }
}

const deleteFile = async (src) => {
  try {
    await rm(src);
  } catch {
    console.error(`Operation failed: could not delete file ${src}`);
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
        renameFile(params);
        break;
      case 'cp':
        copyFile(params);
        break;
      case 'mv':
        moveFile(params);
        break;
      case 'rm':
        deleteFile(getFilePath(params));
        break;
      default:
        invalidInput(command);
    }

  } catch (error) {
    unexpectedError(command, error);
  }
}