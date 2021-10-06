import "source-map-support/register";
import {
    mkdirSync,
    mkdtempSync,
    readFileSync,
    rmSync,
    watch,
    writeFileSync,
} from "fs";
import { basename, dirname, join, resolve } from "path";
import { createHash } from "crypto";
import { tmpdir } from "os";

import MarkdownIt from "markdown-it";
import Highlight from "highlight.js";
import Frontmatter from "markdown-it-front-matter";
import MarkdownItEmoji from "markdown-it-emoji";
import arg from "arg";

import * as pkg from "../package.json";
import { dirListing } from "./dirlisting";
import { makeInclude } from "./include";
import { nomnomlIt } from "./nomnoml";
import { reloadScript, unzoomScript, wrapContent } from "./html";
import { serve } from "./serve";
import { copyFiles, resolveFiles, separateFilesByExtension } from "./files";

export async function main(args: string[]) {
    const parsed = arg(
        {
            "--help": Boolean,
            "--out": String,
            "--theme": String,
            "--hltheme": String,
            "--serve": Number,
            "-r": Boolean,
            "--recursive": Boolean,
        },
        {
            argv: args,
        }
    );

    const allFiles = resolveFiles(
        parsed["_"],
        !!parsed["-r"] || !!parsed["--recursive"]
    );

    const [markdownFiles, otherFiles] =
        separateFilesToMarkdownAndOthers(allFiles);

    if (!markdownFiles.length || parsed["--help"]) {
        console.log(`nomnomd version ${pkg.version}

Usage:
    nomnomd [options] <files...>

    Options:
        [--help]
        [--out DIR]
        [--theme FILE]
        [--hltheme <hljs-theme>]
        [--serve <port>]
        [--recursive|-r]
        `);
        process.exit(0);
    }

    let target = parsed["--out"] ?? "build";

    const themeFile = parsed["--theme"];
    let themeCSS = "";
    if (themeFile) {
        themeCSS = readFileSync(themeFile).toString();
    }

    const codeTheme = parsed["--hltheme"];

    const servePort = parsed["--serve"];
    if (servePort) {
        target = mkdtempSync(join(tmpdir(), "nomnomd"));
        const cleanup = () => {
            rmSync(target, { recursive: true });
            process.exit(0);
        };
        process.on("exit", cleanup);
        process.on("SIGINT", () => process.exit(0));
    }

    if (otherFiles.length) {
        console.log("Copying static files...");
        copyFiles(otherFiles, target);
    }

    console.log("Processing...");
    processFiles(markdownFiles, target, themeCSS, codeTheme, !!servePort);

    if (servePort) {
        watchFiles(markdownFiles, (file) => {
            console.log(`${file} updated, rebuilding...`);
            processFiles(markdownFiles, target, themeCSS, codeTheme, true);
        });
        const fallback = markdownFiles[0].replace(/[.]md$/, ".html");
        serve(target, servePort, fallback);
        console.log(`Serving on port ${servePort}`);
    }
}

function hashFile(path: string): string {
    const contents = readFileSync(path);
    return createHash("sha256").update(contents).digest().toString("hex");
}

function watchFiles(files: string[], cb: (file: string) => void) {
    const watchedFiles = files
        .map((file) => ({
            [file]: hashFile(file),
        }))
        .reduce((previous, current) => {
            return { ...previous, ...current };
        });

    for (const file of files) {
        watch(file, () => {
            const hash = hashFile(file);
            if (watchedFiles[file] != hash) {
                watchedFiles[file] = hash;
                cb(file);
            }
        });
    }
}

function getMarkdownWithPlugins(): MarkdownIt {
    const md = MarkdownIt({
        linkify: true,
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
    md.linkify.set({ fuzzyEmail: false, fuzzyIP: false });
    md.use(MarkdownItEmoji);
    md.use(nomnomlIt);
    md.use(dirListing);
    md.use(makeInclude(getMarkdownWithPlugins));
    return md;
}

function processFiles(
    files: string[],
    target: string,
    themeCSS?: string,
    codeTheme?: string,
    hotReload?: boolean
) {
    const md = getMarkdownWithPlugins();

    let frontmatterData: Record<string, string> = {};

    md.use(Frontmatter, (fm) => {
        frontmatterData = JSON.parse(fm);
    });

    mkdirSync(target, { recursive: true });

    const script = unzoomScript + (hotReload ? reloadScript : "");

    for (const file of files) {
        try {
            const fileDir = dirname(file);

            const text = readFileSync(file);
            frontmatterData = {};
            const content = md.render(text.toString(), {
                cwd: resolve(fileDir),
            });

            const html = wrapContent(content, {
                themeCSS,
                codeTheme,
                title: frontmatterData.title,
                header: frontmatterData.header,
                footer: frontmatterData.footer,
                script,
            });

            mkdirSync(join(target, fileDir), {
                recursive: true,
            });

            writeFileSync(
                join(target, fileDir, basename(file, ".md") + ".html"),
                html
            );
        } catch (ex) {
            console.log(`Failed to render ${file}: ${ex}`);
        }
    }
}

function separateFilesToMarkdownAndOthers(
    files: string[]
): [string[], string[]] {
    return separateFilesByExtension(files, ".md");
}
