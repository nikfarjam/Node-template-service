import { createInterface } from 'readline';
import * as fs from 'fs';
import { Readable } from 'stream';
import { resolve } from 'path';

function fileReader(filePath: string): Readable {
    const fullPath = resolve(filePath);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`File not found ${fullPath}`);
    } else fs.access(fullPath, fs.constants.R_OK, err => {
        if (err) {
            throw new Error(`${fullPath} is not readable`);
        }
    });

    try {
        const fileStream = fs.createReadStream(fullPath);

        const rl = createInterface({
            input: fileStream,
            crlfDelay: Infinity
        });
        return Readable.from(rl);
    } catch (err) {
        throw new Error(`Error in reading ${fullPath}`);
    }

}

export { fileReader }