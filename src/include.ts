import { readFileSync } from "fs";
import { isAbsolute, join } from "path";

import MarkdownIt from "markdown-it";

import {isFile} from "./files";

let includeLevel = 0;

export type MarkdownFactory = () => MarkdownIt;

export function makeInclude(factory: MarkdownFactory): MarkdownIt.PluginSimple {
    return (md: MarkdownIt) => {
        const nextImageRenderer = md.renderer.rules.image;

        md.renderer.rules.image = (tokens, idx, options, env, self) => {
            const token = tokens[idx];
            const src = token.attrGet("src");

            if (src) {
                const cwd: string = env.cwd;
                let file = src;
                if (!isAbsolute(file)) {
                    file = join(cwd, file);
                }

                if (isFile(file) && file.endsWith(".md")) {
                    if (includeLevel > 10) {
                        throw new Error("Include level too deep");
                    }
                    const mdSource = readFileSync(file);
                    const md = factory();
                    includeLevel++;
                    const result = md.render(mdSource.toString(), {});
                    includeLevel--;
                    return result;
                }
            }
            return nextImageRenderer?.(tokens, idx, options, env, self) ?? "";
        };
    };
}

