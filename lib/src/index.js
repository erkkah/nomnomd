"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
var markdown_it_1 = __importDefault(require("markdown-it"));
var markdown_it_fence_1 = __importDefault(require("markdown-it-fence"));
var nomnoml_1 = require("nomnoml");
var arg_1 = __importDefault(require("arg"));
var fs_1 = require("fs");
var path_1 = require("path");
var pkg = __importStar(require("../package.json"));
function main(args) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var parsed, files, target;
        return __generator(this, function (_b) {
            parsed = arg_1.default({
                "--help": Boolean,
                "--out": String,
            }, {
                argv: args,
            });
            files = parsed["_"];
            target = (_a = parsed["--out"]) !== null && _a !== void 0 ? _a : "build";
            if (!files.length || parsed["--help"]) {
                console.log("nomnomd version " + pkg.version + "\n\nUsage:\n    nomnomd [--help|--out DIR] <files..>\n        ");
                process.exit(0);
            }
            processFiles(files, target);
            return [2 /*return*/];
        });
    });
}
exports.main = main;
function getMarkdownWithPlugins() {
    var md = markdown_it_1.default();
    md.use(nomnomlIt);
    md.use(dirListing);
    md.use(include);
    return md;
}
function processFiles(files, target) {
    var e_1, _a;
    var md = getMarkdownWithPlugins();
    fs_1.mkdirSync(target, { recursive: true });
    try {
        for (var files_1 = __values(files), files_1_1 = files_1.next(); !files_1_1.done; files_1_1 = files_1.next()) {
            var file = files_1_1.value;
            var text = fs_1.readFileSync(file);
            var markdown = md.render(text.toString());
            fs_1.writeFileSync(path_1.join(target, path_1.basename(file, ".md") + ".html"), markdown);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (files_1_1 && !files_1_1.done && (_a = files_1.return)) _a.call(files_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function nomnomlIt(md) {
    var nextImageRenderer = md.renderer.rules.image;
    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        var _a;
        var token = tokens[idx];
        var src = token.attrGet("src");
        if (src && (src.endsWith(".nomnoml") || src.endsWith(".noml"))) {
            var nomnomlSource = fs_1.readFileSync(src);
            return nomnomlToSVG(nomnomlSource.toString());
        }
        return (_a = nextImageRenderer === null || nextImageRenderer === void 0 ? void 0 : nextImageRenderer(tokens, idx, options, env, self)) !== null && _a !== void 0 ? _a : "";
    };
    return markdown_it_fence_1.default(md, "nomnoml", {
        marker: "`",
        render: renderNomnoml,
    });
}
function isDir(path) {
    var _a;
    var stats = fs_1.statSync(path, { throwIfNoEntry: false });
    return (_a = stats === null || stats === void 0 ? void 0 : stats.isDirectory()) !== null && _a !== void 0 ? _a : false;
}
function isFile(path) {
    var _a;
    var stats = fs_1.statSync(path, { throwIfNoEntry: false });
    return (_a = stats === null || stats === void 0 ? void 0 : stats.isFile()) !== null && _a !== void 0 ? _a : false;
}
function renderDirListing(path, alt) {
    var entries = fs_1.readdirSync(path, { withFileTypes: true });
    var items = entries.filter(function (entry) { return entry.isFile() && entry.name.endsWith(".md"); });
    var listSource = items.map(function (file) {
        var html = path_1.basename(file.name, ".md") + ".html";
        return "* [" + file.name + "](" + html + ")";
    });
    var md = markdown_it_1.default();
    if (alt) {
        listSource.unshift("### " + alt);
    }
    return md.render(listSource.join("\n"), {});
}
var includeLevel = 0;
var include = function (md) {
    var nextImageRenderer = md.renderer.rules.image;
    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        var _a;
        var token = tokens[idx];
        var src = token.attrGet("src");
        if (src && isFile(src) && src.endsWith(".md")) {
            if (includeLevel > 10) {
                throw new Error("Include level too deep");
            }
            var mdSource = fs_1.readFileSync(src);
            var md_1 = getMarkdownWithPlugins();
            includeLevel++;
            var result = md_1.render(mdSource.toString(), {});
            includeLevel--;
            return result;
        }
        return (_a = nextImageRenderer === null || nextImageRenderer === void 0 ? void 0 : nextImageRenderer(tokens, idx, options, env, self)) !== null && _a !== void 0 ? _a : "";
    };
};
var dirListing = function (md) {
    var nextImageRenderer = md.renderer.rules.image;
    md.renderer.rules.image = function (tokens, idx, options, env, self) {
        var _a;
        var token = tokens[idx];
        var src = token.attrGet("src");
        if (src && isDir(src)) {
            var alt = token.attrGet("alt") || token.content;
            return renderDirListing(src, alt || undefined);
        }
        return (_a = nextImageRenderer === null || nextImageRenderer === void 0 ? void 0 : nextImageRenderer(tokens, idx, options, env, self)) !== null && _a !== void 0 ? _a : "";
    };
};
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
//# sourceMappingURL=index.js.map