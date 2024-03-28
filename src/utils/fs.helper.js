import {readFileSync, writeFileSync} from "fs";
import { join } from "path";


export function readFile(filePath, filename) {
    try {
        const path = join(filePath, filename);
        const data = readFileSync(path, 'utf-8');

        return JSON.parse(data);
    } catch(err) {
        console.log(err.message);
        return null;
    }
}

export function writeFile(filePath, filename, data) {
    try {
        const path = join(filePath, filename);
        writeFileSync(path, data);

    } catch(err) {
        console.log(err.message);
        throw err;
    }
}