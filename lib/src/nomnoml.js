"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nomnomlIt = void 0;
var fs_1 = require("fs");
var markdown_it_fence_1 = __importDefault(require("markdown-it-fence"));
var nomnoml_1 = require("nomnoml");
var path_1 = require("path");
function nomnomlIt(md) {
    var nextImageRenderer = md.renderer.rules.image;
    var alert = "\u274c";
    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        var _a;
        var token = tokens[idx];
        var src = token.attrGet("src");
        if (src) {
            var cwd = env.cwd;
            var file = src;
            if (!path_1.isAbsolute(file)) {
                file = path_1.join(cwd, file);
            }
            if (src.endsWith(".nomnoml") || src.endsWith(".noml")) {
                try {
                    var nomnomlSource = fs_1.readFileSync(file);
                    return nomnomlToSVG(nomnomlSource.toString());
                }
                catch (_) {
                    return "<pre>" + alert + src + "</pre>";
                }
            }
        }
        return (_a = nextImageRenderer === null || nextImageRenderer === void 0 ? void 0 : nextImageRenderer(tokens, idx, options, env, self)) !== null && _a !== void 0 ? _a : "";
    };
    return markdown_it_fence_1.default(md, "nomnoml", {
        marker: "`",
        render: renderNomnoml,
    });
}
exports.nomnomlIt = nomnomlIt;
function nomnomlToSVG(source) {
    try {
        return nomnoml_1.renderSvg(source);
    }
    catch (err) {
        return ('<pre><code class="language-nomnoml">\n' +
            source +
            "\n" +
            "</code></pre>");
    }
}
function renderNomnoml(tokens, idx, _options) {
    var token = tokens[idx];
    return nomnomlToSVG(token.content);
}
//# sourceMappingURL=nomnoml.js.map