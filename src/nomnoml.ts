import { readFileSync } from "fs";

import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import mdf from "@kaishuu0123/markdown-it-fence";
import { renderSvg } from "nomnoml";
import { isAbsolute, join } from "path";

export function nomnomlIt(md: MarkdownIt) {
    const nextImageRenderer = md.renderer.rules.image;
    const alert = "\u274c";

    md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx];
        const src = token.attrGet("src");

        if (src) {
            const cwd: string = env.cwd;
            let file = src;
            if (!isAbsolute(file)) {
                file = join(cwd, file);
            }

            if (src.endsWith(".nomnoml") || src.endsWith(".noml")) {
                try {
                    const nomnomlSource = readFileSync(file);
                    return nomnomlToSVG(nomnomlSource.toString());
                } catch (_) {
                    return `<pre>${alert}${src}</pre>`;
                }
            }
        }
        return nextImageRenderer?.(tokens, idx, options, env, self) ?? "";
    };

    return mdf(md, "nomnoml", {
        marker: "`",
        render: renderNomnoml,
    });
}

let nomnomlID = 5150;

function nomnomlToSVG(source: string): string {
    try {
        const svg = renderSvg(source);
        return `
        <input id="nn${nomnomlID}" type="checkbox" class="toggle"/>
        <label for="nn${nomnomlID++}" class="lbl-toggle"></label>
        <span class="zoomable">${svg}</span>`
    } catch (err) {
        return (
            '<pre><code class="language-nomnoml hljs">\n' +
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
