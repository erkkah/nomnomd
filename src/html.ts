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
                {style}
                {themeCSS}
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
         * Four-color palette from dark to light, or the other way around.
         */
        --c0: var(--color0, #111111);
        --c1: var(--color1, #888888);
        --c2: var(--color2, #aaaaaa);
        --c3: var(--color3, #eeeeee);

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
        margin: 12px 0 6px 0;
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
        // Slight reduction to compensate for the perceived enlargement of fixed vs variable fonts
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
    img {
        max-width: 90vw;
    }
`;

export const reloadScript = `
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
`;
