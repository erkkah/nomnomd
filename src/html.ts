import pupa from "pupa";

export interface WrapOptions {
    title?: string;
    header?: string;
    footer?: string;
    themeCSS?: string;
    codeTheme?: string;
    script?: string;
}

export function wrapContent(content: string, options?: WrapOptions): string {
    const footer = `Generated by nomnomd`;

    return pupa(template, {
        content,
        title: options?.title ?? "",
        header: options?.header ?? "",
        footer: options?.footer ?? footer,
        style,
        themeCSS: options?.themeCSS ?? "",
        codeTheme: options?.codeTheme ?? "agate",
        script: options?.script ?? "",
    });
}

const html = String.raw;

const template = html`
    <!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8" />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1"
            />
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/{codeTheme}.min.css"
            />
            <style>
                {themeCSS}
                {style}
            </style>
            <title>{title}</title>
        </head>

        <body>
            <div class="page">
                <div class="center">
                    <header>
                        <span>{header}</span>
                    </header>
                    <div id="content">{content}</div>
                    <footer>
                        <span>{footer}</span>
                    </footer>
                </div>
            </div>
            <script>{script}</script>
        </body>
    </html>
`;

const css = String.raw;

const style = css`
    :root {
        /* Max width of centered content */
        --maxwidth: 1280px;

        /*
         * HSL - based calculated palette
         */
        --h0: var(--startH);
        --h1: calc(var(--h0) + var(--stepH));
        --h2: calc(var(--h1) + var(--stepH));
        --h3: calc(var(--h2) + var(--stepH));

        --s0: var(--startS);
        --s1: calc(var(--s0) * var(--scaleS));
        --s2: calc(var(--s1) * var(--scaleS));
        --s3: calc(var(--s2) * var(--scaleS));

        --l0: var(--startL);
        --l1: calc(var(--l0) * var(--scaleL));
        --l2: calc(var(--l1) * var(--scaleL));
        --l3: calc(var(--l2) * var(--scaleL));

        --cc0: hsl(var(--h0), var(--s0), var(--l0));
        --cc1: hsl(var(--h1), var(--s1), var(--l1));
        --cc2: hsl(var(--h2), var(--s2), var(--l2));
        --cc3: hsl(var(--h3), var(--s3), var(--l3));

        /*
         * Four-color palette from dark to light, or the other way around.
         */
        --c0: var(--color0, var(--cc0, #111111));
        --c1: var(--color1, var(--cc1, #888888));
        --c2: var(--color2, var(--cc2, #aaaaaa));
        --c3: var(--color3, var(--cc3, #eeeeee));
    
        /* Fonts. Use browser fonts by default */
        --variable: var(--variable-font, sans-serif);
        --fixed: var(--fixed-font, monospace);
        --headline: var(--headline-font, var(--variable));

        /* Divider style: size + dotted, dashed, solid or none */
        --dividers: var(--divider-style, 1px solid);

        /* Heading decoration style: dotted, et.c. */
        --heading-style: var(--heading-decoration, none);
    }

    body {
        margin: 0;
        font-family: var(--variable);
        font-size: 1em;
    }

    /* The whole page */
    .page {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-content: stretch;
        background-color: var(--c0);
        min-height: 100vh;
    }

    /* Horizontally centered content */
    .center {
        display: flex;
        flex-direction: column;
        max-width: var(--maxwidth);
        flex-grow: 1;
        padding: 8px;
        background-color: var(--c1);
        justify-content: stretch;
    }

    /* Page parts: header, content, section, footer */

    header {
        padding: 0 8px 8px 8px;
        border-bottom: 2px solid var(--c0);
        text-align: left;
        color: var(--c3);
    }

    #content {
        flex-grow: 1;
    }

    section {
        display: flex;
        flex-direction: column;
        margin-top: 8px;
        margin-left: 8px;
        padding-bottom: 8px;
        border-bottom: var(--dividers) var(--c2);
        color: var(--c3);
        max-width: calc(100vw - 40px);
    }

    footer {
        font-size: smaller;
        text-align: center;
        color: var(--c3);
    }

    /* Common elements */

    a {
        text-decoration: none;
        border-bottom: 0.5px solid var(--c2);
        color: var(--c3);
        word-wrap: break-word;
    }

    a[href^="#"].target {
        pointer-events: none;
        cursor: text;
        filter: grayscale(1);
        border-bottom-width: 2px;
    }

    header a {
        border: none;
    }

    h1,
    h2,
    h3,
    h4,
    h5 {
        border-bottom: var(--heading-style) var(--c3);
        align-self: flex-start;
        flex-grow: 0;
        flex-shrink: 1;
        margin: 16px 0 6px 0;
    }

    h1 + p,
    h2 + p,
    h3 + p,
    h4 + p,
    h5 + p {
        margin-top: 4px;
    }

    p {
        margin-top: 8px;
        margin-bottom: 4px;
    }

    ol,
    ul {
        margin: 4px 0;
    }

    ol ol,
    ol ul,
    ul ul,
    ul ol {
        margin: 0;
    }

    li {
        line-height: 1.5;
    }

    hr {
        border: none;
        border-top: 1px solid var(--c0);
        color: var(--c0);
        text-align: center;
        height: 4px;
        margin: 1ch 0;
    }

    pre {
        margin-top: 4px;
        margin-bottom: 4px;
    }

    code {
        font-family: var(--fixed);
        /* Slight reduction to compensate for the perceived enlargement of fixed vs variable fonts */
        font-size: 0.98em;
    }

    pre code {
        padding: 4px 2px;
        margin: 8px 0;
        display: block;
        overflow: scroll;
        scrollbar-width: none;
        scroll-padding: 0;
    }

    code::-webkit-scrollbar {
        display: none;
    }

    blockquote {
        border-left: var(--dividers) var(--c0);
        padding-left: 0.5em;
    }

    table {
        --border: solid 1px var(--c0);
        border: var(--border);
        border-spacing: 0;
    }

    th,
    td {
        padding: 0 2px 0 4px;
        margin: 0;
    }

    tr {
        margin: 0;
        padding: 0;
    }

    tr:nth-child(even) {
        background-color: var(--c2);
        color: var(--c0);
        filter: hue-rotate(-12deg) contrast(0.8);
    }

    th {
        border-bottom: var(--border);
        background-color: var(--c2);
        color: var(--c0);
    }

    td,
    th {
        border-right: var(--border);
    }

    td:nth-last-child(1),
    th:nth-last-child(1) {
        border-right: none;
    }

    /* img styling */
    img, svg {
        max-width: 100%;
        height: auto;
        border: dotted var(--c0) 0.2px;
    }

    input[type="checkbox"].toggle {
        display: none;
        z-index: 1;
    }

    .lbl-toggle {
        display: inline-block;
        cursor: pointer;
        position: relative;
        top: 0.5em;
        left: 1ex;
        z-index: 1;
    }

    .lbl-toggle:before {
        content: "🔍";
        filter: opacity(0.1);
        transition: filter 0.2s ease-in;
    }

    .lbl-toggle:hover:before {
        filter: opacity(1);
    }

    .toggle:checked + .lbl-toggle:before {
        content: "✕";
        filter: opacity(1);
    }

    .toggle:checked + .lbl-toggle {
        z-index: 4;
        position: fixed;
        top: 10px;
        left: 10px;
        width: 2ex;
        height: 2ex;
        border: 2px solid black;
        background: white;
        text-align: center;
        padding: 2px;
        font-size: xx-large;
    }

    .toggle:checked + .lbl-toggle + .zoomable {
        z-index: 2;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(5px);
    }

    .zoomable {
        position: relative;
        top: -1.5em;
        display: block;
        transition: backdrop-filter 0.3s ease-out;
    }

    .zoomable > svg {
        transition: width 0.1s ease-in;
        max-height: 90vh;
    }

    .toggle:checked + .lbl-toggle + .zoomable > svg {
        z-index: 3;
        width: 90vw;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--c1);
        border: 2px solid var(--c0);
    }
    
`;

export const reloadScript = (function reloader() {
    let lastUpdated = 0;

    function checkLastUpdated() {
        var req = new XMLHttpRequest();
        req.addEventListener("load", () => {
            const response = JSON.parse(req.response);
            const updated = response.updated || lastUpdated;
            if (lastUpdated > 0 && updated > lastUpdated) {
                location.reload();
            } else {
                lastUpdated = updated;
                setTimeout(checkLastUpdated, 1000);
            }
        });
        req.open("GET", document.URL + "?lastUpdated");
        req.send();
    }
    
    setTimeout(checkLastUpdated, 1000);    
}).toString() + ";reloader();";

export const unzoomScript = (function registerUnzoomHandler() {
    document.addEventListener("keydown", (event) => {
        if (event.code === "Escape") {
            const inputs = document.getElementsByTagName<"input">("input");
            for (const i in inputs) {
                const input = inputs[i];
                if (input.type == "checkbox") {
                    input.checked = false;
                }
            }
        }
    });
}).toString() + ";registerUnzoomHandler();";
