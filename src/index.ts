import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import mdf from "markdown-it-fence";
import { renderSvg } from "nomnoml";
import arg from "arg";
import {
    mkdirSync,
    readdirSync,
    readFileSync,
    statSync,
    writeFileSync,
} from "fs";
import { basename, join } from "path";
import * as pkg from "../package.json";

export async function main(args: string[]) {
    const parsed = arg(
        {
            "--help": Boolean,
            "--out": String,
        },
        {
            argv: args,
        }
    );

    const files = parsed["_"];
    const target = parsed["--out"] ?? "build";

    if (!files.length || parsed["--help"]) {
        console.log(`nomnomd version ${pkg.version}

Usage:
    nomnomd [--help|--out DIR] <files..>
        `);
        process.exit(0);
    }

    processFiles(files, target);
}

function getMarkdownWithPlugins(): MarkdownIt {
    const md = MarkdownIt();
    md.use(nomnomlIt);
    md.use(dirListing);
    md.use(include);
    return md;
}

function processFiles(files: string[], target: string) {
    const md = getMarkdownWithPlugins();

    mkdirSync(target, { recursive: true });

    for (const file of files) {
        const text = readFileSync(file);
        const markdown = md.render(text.toString());
        writeFileSync(join(target, basename(file, ".md") + ".html"), markdown);
    }
}

function nomnomlIt(md: MarkdownIt) {
    const nextImageRenderer = md.renderer.rules.image;

    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const src = token.attrGet("src");
        if (src && (src.endsWith(".nomnoml") || src.endsWith(".noml"))) {
            const nomnomlSource = readFileSync(src);
            return nomnomlToSVG(nomnomlSource.toString());
        }
        return nextImageRenderer?.(tokens, idx, options, env, self) ?? "";
    };

    return mdf(md, "nomnoml", {
        marker: "`",
        render: renderNomnoml,
    });
}

function isDir(path: string): boolean {
    const stats = statSync(path, { throwIfNoEntry: false });
    return stats?.isDirectory() ?? false;
}

function isFile(path: string): boolean {
    const stats = statSync(path, { throwIfNoEntry: false });
    return stats?.isFile() ?? false;
}

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

let includeLevel = 0;

const include: MarkdownIt.PluginSimple = (md: MarkdownIt) => {
    const nextImageRenderer = md.renderer.rules.image;

    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const src = token.attrGet("src");
        if (src && isFile(src) && src.endsWith(".md")) {
            if (includeLevel > 10) {
                throw new Error("Include level too deep");
            }
            const mdSource = readFileSync(src);
            const md = getMarkdownWithPlugins();
            includeLevel++;
            const result = md.render(mdSource.toString(), {});
            includeLevel--;
            return result;
        }
        return nextImageRenderer?.(tokens, idx, options, env, self) ?? "";
    };
};

const dirListing: MarkdownIt.PluginSimple = (md: MarkdownIt) => {
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

function nomnomlToSVG(source: string): string {
    try {
        return renderSvg(source);
    } catch (err) {
        return (
            '<pre><code class="language-nomnoml">\n' +
            source +
            "\n" +
            "</code></pre>"
        );
    }
}

function renderNomnoml(
    tokens: Token[],
    idx: number,
    _options: MarkdownIt.Options
): string {
    const token = tokens[idx];
    return nomnomlToSVG(token.content);
}
