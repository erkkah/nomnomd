import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { basename, join } from "path";

import MarkdownIt from "markdown-it";
import Highlight from "highlight.js";
import Frontmatter from "markdown-it-front-matter";
import arg from "arg";

import * as pkg from "../package.json";
import { dirListing } from "./dirlisting";
import { makeInclude } from "./include";
import { nomnomlIt } from "./nomnoml";
import { wrapContent } from "./html";

export async function main(args: string[]) {
    const parsed = arg(
        {
            "--help": Boolean,
            "--out": String,
            "--theme": String,
            "--hltheme": String,
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
    nomnomd [--help] [--out DIR] [--theme FILE] [--hltheme <hljs-theme>] <files..>
        `);
        process.exit(0);
    }

    const themeFile = parsed["--theme"];
    let themeCSS = "";
    if (themeFile) {
        themeCSS = readFileSync(themeFile).toString();
    }
    const codeTheme = parsed["--hltheme"];
    processFiles(files, target, themeCSS, codeTheme);
}

function getMarkdownWithPlugins(): MarkdownIt {
    const md = MarkdownIt({
        highlight: (str, lang) => {
            if (lang && Highlight.getLanguage(lang)) {
                try {
                    return (
                        '<pre class="hljs"><code>' +
                        Highlight.highlight(str, {
                            language: lang,
                            ignoreIllegals: true,
                        }).value +
                        "</code></pre>"
                    );
                } catch (_) {
                    //
                }
            }
            return "";
        },
    });
    md.use(nomnomlIt);
    md.use(dirListing);
    md.use(makeInclude(getMarkdownWithPlugins));
    return md;
}

function processFiles(
    files: string[],
    target: string,
    themeCSS?: string,
    codeTheme?: string
) {
    const md = getMarkdownWithPlugins();

    let frontmatterData: Record<string, string> = {};

    md.use(Frontmatter, (fm) => {
        frontmatterData = JSON.parse(fm);
    });

    mkdirSync(target, { recursive: true });

    for (const file of files) {
        const text = readFileSync(file);
        const content = md.render(text.toString());

        const html = wrapContent(content, {
            themeCSS,
            codeTheme,
            title: frontmatterData.title,
            header: frontmatterData.header,
            footer: frontmatterData.footer,
        });
        writeFileSync(join(target, basename(file, ".md") + ".html"), html);
    }
}
