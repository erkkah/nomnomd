"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dirListing = void 0;
var assert_1 = require("assert");
var fs_1 = require("fs");
var path_1 = require("path");
var markdown_it_1 = __importDefault(require("markdown-it"));
var markdown_it_front_matter_1 = __importDefault(require("markdown-it-front-matter"));
var pupa_1 = __importDefault(require("pupa"));
var files_1 = require("./files");
var dirListing = function (md) {
    var nextImageRenderer = md.renderer.rules.image;
    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        var _a;
        var token = tokens[idx];
        var src = token.attrGet("src");
        if (src) {
            var cwd = env.cwd;
            var _b = __read(fileAndPathFromSrc(src, cwd), 2), dir = _b[0], path = _b[1];
            if (files_1.isDir(dir)) {
                var alt = token.attrGet("alt") || token.content;
                return renderDirListing(dir, path, alt || undefined);
            }
        }
        return (_a = nextImageRenderer === null || nextImageRenderer === void 0 ? void 0 : nextImageRenderer(tokens, idx, options, env, self)) !== null && _a !== void 0 ? _a : "";
    };
};
exports.dirListing = dirListing;
/**
 * @param src a file src string without protocol
 * @param cwd absolute path to the current working directory
 * @returns a pair of the absolute path to the file and the cwd-relative url path
 */
function fileAndPathFromSrc(src, cwd) {
    assert_1.strict(path_1.isAbsolute(cwd), "CWD must be absolute");
    var normalizedSrc = path_1.normalize(src);
    var absoluteSrc = path_1.resolve(cwd, normalizedSrc);
    var relativeSrc = path_1.relative(cwd, absoluteSrc);
    return [absoluteSrc, relativeSrc];
}
function renderDirListing(dir, path, alt) {
    var entries = fs_1.readdirSync(dir, { withFileTypes: true });
    var items = entries
        .filter(function (entry) { return entry.isFile() && entry.name.endsWith(".md"); })
        .sort(function (a, b) { return a.name.localeCompare(b.name); });
    var listSource = items.map(function (file) {
        var html = path_1.join(path, file.name.replace(/[.]md$/, ".html"));
        var description = "";
        if (alt) {
            var frontmatterData = extractFrontmatter(path_1.join(dir, file.name));
            description = pupa_1.default(alt, frontmatterData);
        }
        return "* [" + file.name + "](" + html + ") " + description;
    });
    var md = markdown_it_1.default();
    return md.render(listSource.join("\n"), {});
}
function extractFrontmatter(path) {
    var md = markdown_it_1.default();
    var frontmatterData = {};
    md.use(markdown_it_front_matter_1.default, function (fm) {
        frontmatterData = JSON.parse(fm);
    });
    try {
        var fileContents = fs_1.readFileSync(path);
        md.render(fileContents.toString(), {});
    }
    catch (_) {
        console.log("Failed to extract frontmatter from " + path);
    }
    var blankReplacer = new Proxy(frontmatterData, {
        get: function (target, prop) {
            return prop in target && typeof (prop) === "string" ? target[prop] : "";
        },
    });
    return blankReplacer;
}
//# sourceMappingURL=dirlisting.js.map