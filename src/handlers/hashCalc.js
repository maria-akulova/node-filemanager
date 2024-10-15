
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

export const hashCalc = async (params) => {
  const [fileName] = params;
  const src = join(process.cwd(), fileName);

  try {
    const inputSync = await readFile(src);
    const hashAlternative = createHash("sha256").update(inputSync).digest("hex");
    console.log(hashAlternative);

  } catch (err) {
    console.error('Error during hash calculation:', err);
  }
}