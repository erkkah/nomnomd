import MarkdownIt from "markdown-it";

export const markdownLinks: MarkdownIt.PluginSimple = (md: MarkdownIt) => {
    md.core.ruler.after("inline", "md-link", (state) => {
        state.tokens
            .filter((token) => token.type === "inline" && token.children)
            .forEach((inlineToken) => {
                inlineToken.children
                    ?.filter((child) => child.type === "link_open")
                    .forEach((child) =>
                        child.attrs
                            ?.filter(
                                (attr) =>
                                    attr[0] === "href" &&
                                    attr[1].endsWith(".md")
                            )
                            .forEach((attr) => {
                                attr[1] = attr[1].replace(/\.md$/, ".html");
                            })
                    );
            });
        return true;
    });
};
