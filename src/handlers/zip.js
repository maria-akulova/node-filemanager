import { createWriteStream, createReadStream } from 'node:fs';
import { createBrotliCompress, createBrotliDecompress } from 'node:zlib';
import { pipeline } from 'node:stream/promises';
import { resolve, join } from 'node:path';


export const compressFile = async (params) => {
  try {
    const [file, archName] = params;
    const brotli = createBrotliCompress();

    const fileToZip = join(process.cwd(), file);
    const zippedFile = join(process.cwd(), archName);

    const src = createReadStream(fileToZip);
    const destination = createWriteStream(zippedFile);

    await pipeline(src, brotli, destination);
  } catch (err) {
    console.error(`Error during compressing file: ${err.message}`);
  }
};



export const decompressFile = async (params) => {
  try {
    const [fileName, destFileName] = params;

    const fileToUnzip = join(process.cwd(), fileName);
    const unzipFilePath = resolve(process.cwd(), destFileName);

    const unzip = createBrotliDecompress();

    const src = createReadStream(fileToUnzip);
    const destination = createWriteStream(unzipFilePath);

    await pipeline(src, unzip, destination);
  } catch (err) {
    console.error(`Error during decompressing file: ${err.message}`);
  }
};


