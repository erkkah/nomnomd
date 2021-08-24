import { strict as assert } from "assert";
import { readdirSync, readFileSync } from "fs";
import { isAbsolute, join, normalize, relative, resolve } from "path";

import MarkdownIt from "markdown-it";
import Frontmatter from "markdown-it-front-matter";
import pupa from "pupa";

import {isDir} from "./files";

export const dirListing: MarkdownIt.PluginSimple = (md: MarkdownIt) => {
    const nextImageRenderer = md.renderer.rules.image;

    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const src = token.attrGet("src");

        if (src) {
            const cwd: string = env.cwd;

            const [dir, path] = fileAndPathFromSrc(src, cwd);

            if (isDir(dir)) {
                const alt = token.attrGet("alt") || token.content;
                return renderDirListing(dir, path, alt || undefined);
            }
        }
        return nextImageRenderer?.(tokens, idx, options, env, self) ?? "";
    };
};

/**
 * @param src a file src string without protocol
 * @param cwd absolute path to the current working directory
 * @returns a pair of the absolute path to the file and the cwd-relative url path
 */
function fileAndPathFromSrc(src: string, cwd: string): [string, string] {
    assert(isAbsolute(cwd), "CWD must be absolute");

    const normalizedSrc = normalize(src);
    const absoluteSrc = resolve(cwd, normalizedSrc);
    const relativeSrc = relative(cwd, absoluteSrc);
    return [absoluteSrc, relativeSrc];
}

function renderDirListing(dir: string, path: string, alt?: string): string {
    const entries = readdirSync(dir, { withFileTypes: true });
    const items = entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
        .sort((a, b) => a.name.localeCompare(b.name));

    const listSource = items.map((file) => {
        const html = join(path, file.name.replace(/[.]md$/, ".html"));
        let description = "";
        if (alt) {
            const frontmatterData = extractFrontmatter(join(dir, file.name));
            description = pupa(alt, frontmatterData);
        }
        return `* [${file.name}](${html}) ${description}`;
    });
    const md = MarkdownIt();
    return md.render(listSource.join("\n"), {});
}

function extractFrontmatter(path: string): Record<string, string | number> {
    const md = MarkdownIt();
    let frontmatterData: Record<string, string | number> = {};

    md.use(Frontmatter, (fm) => {
        frontmatterData = JSON.parse(fm);
    });

    try {
        const fileContents = readFileSync(path);
        md.render(fileContents.toString(), {});
    } catch (_) {
        console.log(`Failed to extract frontmatter from ${path}`)
    }

    const blankReplacer = new Proxy(frontmatterData, {
        get: (target, prop) => {
            return prop in target && typeof(prop) === "string" ? target[prop] : "";
        },
    });

    return blankReplacer;
}
