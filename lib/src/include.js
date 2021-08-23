"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeInclude = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var files_1 = require("./files");
var includeLevel = 0;
function makeInclude(factory) {
    return function (md) {
        var nextImageRenderer = md.renderer.rules.image;
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
                if (files_1.isFile(file) && file.endsWith(".md")) {
                    if (includeLevel > 10) {
                        throw new Error("Include level too deep");
                    }
                    var mdSource = fs_1.readFileSync(file);
                    var md_1 = factory();
                    includeLevel++;
                    var result = md_1.render(mdSource.toString(), {});
                    includeLevel--;
                    return result;
                }
            }
            return (_a = nextImageRenderer === null || nextImageRenderer === void 0 ? void 0 : nextImageRenderer(tokens, idx, options, env, self)) !== null && _a !== void 0 ? _a : "";
        };
    };
}
exports.makeInclude = makeInclude;
//# sourceMappingURL=include.js.map