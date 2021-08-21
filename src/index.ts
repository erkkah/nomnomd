import { mkdirSync, readFileSync, writeFileSync } from "fs";
import { basename, join } from "path";

import MarkdownIt from "markdown-it";
import arg from "arg";

import * as pkg from "../package.json";
import { dirListing } from "./dirlisting";
import { makeInclude } from "./include";
import { nomnomlIt } from "./nomnoml";

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
    md.use(makeInclude(getMarkdownWithPlugins));
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
