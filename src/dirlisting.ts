import { readdirSync, statSync } from "fs";
import { basename } from "path";

import MarkdownIt from "markdown-it";

export const dirListing: MarkdownIt.PluginSimple = (md: MarkdownIt) => {
    const nextImageRenderer = md.renderer.rules.image;

    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const src = token.attrGet("src");
        if (src && isDir(src)) {
            const alt = token.attrGet("alt") || token.content;
            return renderDirListing(src, alt || undefined);
        }
        return nextImageRenderer?.(tokens, idx, options, env, self) ?? "";
    };
};

function renderDirListing(path: string, alt?: string): string {
    const entries = readdirSync(path, { withFileTypes: true });
    const items = entries.filter(
        (entry) => entry.isFile() && entry.name.endsWith(".md")
    );

    const listSource = items.map((file) => {
        const html = `${basename(file.name, ".md")}.html`;
        return `* [${file.name}](${html})`;
    });
    const md = MarkdownIt();
    if (alt) {
        listSource.unshift(`### ${alt}`);
    }
    return md.render(listSource.join("\n"), {});
}

function isDir(path: string): boolean {
    const stats = statSync(path, { throwIfNoEntry: false });
    return stats?.isDirectory() ?? false;
}
