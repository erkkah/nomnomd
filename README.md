# nomnomd = nomnoml + md

**nomnomd** processes Markdown with included or referenced [nomnoml] diagrams and produces HTML.

I threw together **nomnomd** to write documentation for a project where I wanted to keep all docs in the code repo and depend on as few external tools as possible.

Each generated HTML file is self-contained.

## Markdown extensions

### Embedded [nomnoml] diagrams

By using the `nomnoml` fence code, a diagram can be written directly in a code block:

~~~markdown
```nomnoml
[A] -> [B]
```
~~~

**nomnoml** files (ending in `.noml` or `.nomnoml`) can be referenced as images:

```markdown
![Class Diagram](./classes.noml)
```

In both cases, the generated SVG is embedded in the resulting HTML file.

### Markdown file listings and includes

**nomnomd** overloads the Markdown image syntax to mean "in place" or "here".
This allows for creating file lists

```markdown
![File listing](./docs)
```

and including files:

```markdown
![Changelist](changelist.md)
```

Note that only Markdown (.md) files are listed and included.

### Emojis

All [GitHub emojis](https://github.com/ikatyang/emoji-cheat-sheet/blob/master/README.md) should work. :white_check_mark:

## Themes

[sheetleeten] theme files can be used to override the default theme:

```shell
$ npx @erkkah/nomnomd --theme coffee.css docs.md
```

Creating themes is easy, basically just setting four colors and two fonts.

Syntax highlighting is provided by [highlight.js]. The default theme can be changed by specifying a theme name:

```shell
$ npx @erkkah/nomnomd --hltheme rainbow docs.md
```

## Working with **nomnomd**

```
Usage:
    nomnomd [options] <files...>

    Options:
        [--help]
        [--out DIR]
        [--theme FILE]
        [--hltheme <hljs-theme>]
        [--serve <port>]
        [--recursive|-r]
```

Simply running `nomnomd` with a set of Markdown files generates the resulting HTML files in the `build` output folder.

If recursive mode is turned on, all directories passed `nomnomd` will be traversed, and all `.md` files found will be processed.

During development, `nomnomd` can be run with the `--serve` flag to launch a little watching, hot-reloading development server on the given port. No output is written in serve mode.

[sheetleeten]: https://erkkah.github.io/sheetleeten
[nomnoml]: https://nomnoml.com
[highlight.js]: https://highlightjs.org
