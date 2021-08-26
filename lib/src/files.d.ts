export declare function isFile(path: string): boolean;
export declare function isDir(path: string): boolean;
export declare function resolveFiles(files: string[], recursive: boolean): string[];
export declare function separateFilesByExtension(files: string[], extension: string): [string[], string[]];
export declare function copyFiles(files: string[], target: string): void;
