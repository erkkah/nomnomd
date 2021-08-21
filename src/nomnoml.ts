import { readFileSync } from "fs";

import MarkdownIt from "markdown-it";
import Token from "markdown-it/lib/token";
import mdf from "markdown-it-fence";
import { renderSvg } from "nomnoml";

export function nomnomlIt(md: MarkdownIt) {
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
