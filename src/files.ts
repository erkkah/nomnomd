import { copyFileSync, mkdirSync, readdirSync, statSync } from "fs";
import { basename, dirname, isAbsolute, join } from "path";

export function isFile(path: string): boolean {
    const stats = statSync(path, { throwIfNoEntry: false });
    return stats?.isFile() ?? false;
}

export function isDir(path: string): boolean {
    const stats = statSync(path, { throwIfNoEntry: false });
    return stats?.isDirectory() ?? false;
}

export function resolveFiles(files: string[], recursive: boolean): string[] {
    const seen = new Set<string>();
    const cwd = process.cwd();

    const unresolved = [...files];
    const resolved: string[] = [];

    while (unresolved.length) {
        const file = unresolved.shift() || "";
        if (isDir(file)) {
            if (recursive) {
                const files = readdirSync(file).map((item) => join(file, item));
                unresolved.push(...files);
            }
        } else if (isFile(file)) {
            let abs = file;
            if (!isAbsolute(abs)) {
                abs = join(cwd, file);
            }
            if (!seen.has(abs)) {
                seen.add(abs);
                resolved.push(file);
            }
        }
    }

    return resolved;
}

export function separateFilesByExtension(
    files: string[],
    extension: string
): [string[], string[]] {
    const markdown: string[] = [];
    const others: string[] = [];

    for (const file of files) {
        if (file.endsWith(extension)) {
            markdown.push(file);
        } else {
            others.push(file);
        }
    }

    return [markdown, others];
}

export function copyFiles(files: string[], target: string) {
    for (const file of files) {
        const fileDir = join(target, dirname(file));
        mkdirSync(fileDir, { recursive: true });
        copyFileSync(file, join(fileDir, basename(file)));
    }
}
