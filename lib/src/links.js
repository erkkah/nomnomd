"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdownLinks = void 0;
var markdownLinks = function (md) {
    md.core.ruler.after("inline", "md-link", function (state) {
        state.tokens
            .filter(function (token) { return token.type === "inline" && token.children; })
            .forEach(function (inlineToken) {
            var _a;
            (_a = inlineToken.children) === null || _a === void 0 ? void 0 : _a.filter(function (child) { return child.type === "link_open"; }).forEach(function (child) {
                var _a;
                return (_a = child.attrs) === null || _a === void 0 ? void 0 : _a.filter(function (attr) {
                    return attr[0] === "href" &&
                        attr[1].endsWith(".md");
                }).forEach(function (attr) {
                    attr[1] = attr[1].replace(/\.md$/, ".html");
                });
            });
        });
        return true;
    });
};
exports.markdownLinks = markdownLinks;
//# sourceMappingURL=links.js.map