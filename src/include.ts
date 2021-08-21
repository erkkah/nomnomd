import { readFileSync, statSync } from "fs";

import MarkdownIt from "markdown-it";

let includeLevel = 0;

export type MarkdownFactory = () => MarkdownIt;

export function makeInclude(factory: MarkdownFactory): MarkdownIt.PluginSimple {
    return (md: MarkdownIt) => {
        const nextImageRenderer = md.renderer.rules.image;

        md.renderer.rules.image = (tokens, idx, options, env, self) => {
            const token = tokens[idx];
            const src = token.attrGet("src");
            if (src && isFile(src) && src.endsWith(".md")) {
                if (includeLevel > 10) {
                    throw new Error("Include level too deep");
                }
                const mdSource = readFileSync(src);
                const md = factory();
                includeLevel++;
                const result = md.render(mdSource.toString(), {});
                includeLevel--;
                return result;
            }
            return nextImageRenderer?.(tokens, idx, options, env, self) ?? "";
        };
    };
}

function isFile(path: string): boolean {
    const stats = statSync(path, { throwIfNoEntry: false });
    return stats?.isFile() ?? false;
}
