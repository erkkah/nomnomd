import { statSync } from "fs";

export function isFile(path: string): boolean {
    const stats = statSync(path, { throwIfNoEntry: false });
    return stats?.isFile() ?? false;
}


export function isDir(path: string): boolean {
    const stats = statSync(path, { throwIfNoEntry: false });
    return stats?.isDirectory() ?? false;
}

