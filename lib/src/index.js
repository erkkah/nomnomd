"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
require("source-map-support/register");
var fs_1 = require("fs");
var path_1 = require("path");
var markdown_it_1 = __importDefault(require("markdown-it"));
var highlight_js_1 = __importDefault(require("highlight.js"));
var markdown_it_front_matter_1 = __importDefault(require("markdown-it-front-matter"));
var markdown_it_emoji_1 = __importDefault(require("markdown-it-emoji"));
var arg_1 = __importDefault(require("arg"));
var pkg = __importStar(require("../package.json"));
var dirlisting_1 = require("./dirlisting");
var include_1 = require("./include");
var nomnoml_1 = require("./nomnoml");
var html_1 = require("./html");
var serve_1 = require("./serve");
var crypto_1 = require("crypto");
var os_1 = require("os");
var files_1 = require("./files");
var posix_1 = require("path/posix");
function main(args) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var parsed, files, target, servePort, cleanup, themeFile, themeCSS, codeTheme, fallback;
        return __generator(this, function (_b) {
            parsed = arg_1.default({
                "--help": Boolean,
                "--out": String,
                "--theme": String,
                "--hltheme": String,
                "--serve": Number,
                "-r": Boolean,
                "--recursive": Boolean,
            }, {
                argv: args,
            });
            files = resolveFiles(parsed["_"], !!parsed["-r"] || !!parsed["--recursive"]);
            if (!files.length || parsed["--help"]) {
                console.log("nomnomd version " + pkg.version + "\n\nUsage:\n    nomnomd [options] <files...>\n\n    Options:\n        [--help]\n        [--out DIR]\n        [--theme FILE]\n        [--hltheme <hljs-theme>]\n        [--serve <port>]\n        [--recursive|-r]\n        ");
                process.exit(0);
            }
            target = (_a = parsed["--out"]) !== null && _a !== void 0 ? _a : "build";
            servePort = parsed["--serve"];
            if (servePort) {
                target = fs_1.mkdtempSync(path_1.join(os_1.tmpdir(), "nomnomd"));
                cleanup = function () {
                    fs_1.rmSync(target, { recursive: true });
                    process.exit(0);
                };
                process.on("exit", cleanup);
                process.on("SIGINT", function () { return process.exit(0); });
            }
            themeFile = parsed["--theme"];
            themeCSS = "";
            if (themeFile) {
                themeCSS = fs_1.readFileSync(themeFile).toString();
            }
            codeTheme = parsed["--hltheme"];
            processFiles(files, target, themeCSS, codeTheme, !!servePort);
            if (servePort) {
                watchFiles(files, function (file) {
                    console.log(file + " updated, rebuilding...");
                    processFiles(files, target, themeCSS, codeTheme, true);
                });
                fallback = files[0].replace(/[.]md$/, ".html");
                serve_1.serve(target, servePort, fallback);
                console.log("Serving on port " + servePort);
            }
            return [2 /*return*/];
        });
    });
}
exports.main = main;
function hashFile(path) {
    var contents = fs_1.readFileSync(path);
    return crypto_1.createHash("sha256").update(contents).digest().toString("hex");
}
function watchFiles(files, cb) {
    var e_1, _a;
    var watchedFiles = files
        .map(function (file) {
        var _a;
        return (_a = {},
            _a[file] = hashFile(file),
            _a);
    })
        .reduce(function (previous, current) {
        return __assign(__assign({}, previous), current);
    });
    var _loop_1 = function (file) {
        fs_1.watch(file, function () {
            var hash = hashFile(file);
            if (watchedFiles[file] != hash) {
                watchedFiles[file] = hash;
                cb(file);
            }
        });
    };
    try {
        for (var files_2 = __values(files), files_2_1 = files_2.next(); !files_2_1.done; files_2_1 = files_2.next()) {
            var file = files_2_1.value;
            _loop_1(file);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (files_2_1 && !files_2_1.done && (_a = files_2.return)) _a.call(files_2);
        }
        finally { if (e_1) throw e_1.error; }
    }
}
function resolveFiles(files, recursive) {
    var seen = new Set();
    var cwd = process.cwd();
    var unresolved = __spreadArray([], __read(files));
    var resolved = [];
    var _loop_2 = function () {
        var file = unresolved.shift() || "";
        if (files_1.isDir(file)) {
            if (recursive) {
                var files_3 = fs_1.readdirSync(file).map(function (item) { return path_1.join(file, item); });
                unresolved.push.apply(unresolved, __spreadArray([], __read(files_3)));
            }
        }
        else if (files_1.isFile(file)) {
            var abs = file;
            if (!posix_1.isAbsolute(abs)) {
                abs = path_1.join(cwd, file);
            }
            if (!seen.has(abs)) {
                seen.add(abs);
                resolved.push(file);
            }
        }
    };
    while (unresolved.length) {
        _loop_2();
    }
    return resolved;
}
function getMarkdownWithPlugins() {
    var md = markdown_it_1.default({
        highlight: function (str, lang) {
            if (lang && highlight_js_1.default.getLanguage(lang)) {
                try {
                    return ('<pre class="hljs"><code>' +
                        highlight_js_1.default.highlight(str, {
                            language: lang,
                            ignoreIllegals: true,
                        }).value +
                        "</code></pre>");
                }
                catch (_) {
                    //
                }
            }
            return "";
        },
    });
    md.use(markdown_it_emoji_1.default);
    md.use(nomnoml_1.nomnomlIt);
    md.use(dirlisting_1.dirListing);
    md.use(include_1.makeInclude(getMarkdownWithPlugins));
    return md;
}
function processFiles(files, target, themeCSS, codeTheme, hotReload) {
    var e_2, _a;
    var md = getMarkdownWithPlugins();
    var frontmatterData = {};
    md.use(markdown_it_front_matter_1.default, function (fm) {
        frontmatterData = JSON.parse(fm);
    });
    fs_1.mkdirSync(target, { recursive: true });
    var script = hotReload ? html_1.reloadScript : "";
    try {
        for (var files_4 = __values(files), files_4_1 = files_4.next(); !files_4_1.done; files_4_1 = files_4.next()) {
            var file = files_4_1.value;
            var fileDir = path_1.dirname(file);
            var text = fs_1.readFileSync(file);
            frontmatterData = {};
            var content = md.render(text.toString(), { cwd: path_1.resolve(fileDir) });
            var html = html_1.wrapContent(content, {
                themeCSS: themeCSS,
                codeTheme: codeTheme,
                title: frontmatterData.title,
                header: frontmatterData.header,
                footer: frontmatterData.footer,
                script: script,
            });
            fs_1.mkdirSync(path_1.join(target, fileDir), {
                recursive: true,
            });
            fs_1.writeFileSync(path_1.join(target, fileDir, path_1.basename(file, ".md") + ".html"), html);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (files_4_1 && !files_4_1.done && (_a = files_4.return)) _a.call(files_4);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
//# sourceMappingURL=index.js.map