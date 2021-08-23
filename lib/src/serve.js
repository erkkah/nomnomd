"use strict";
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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
var fs_1 = require("fs");
var promises_1 = require("fs/promises");
var http_1 = require("http");
var mime_1 = __importDefault(require("mime"));
var posix_1 = require("path/posix");
function serve(root, port, fallback) {
    var _this = this;
    var updated = Date.now();
    (function () { return __awaiter(_this, void 0, void 0, function () {
        var watcher, watcher_1, watcher_1_1, _, e_1_1;
        var e_1, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    watcher = promises_1.watch(root, { recursive: true });
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    watcher_1 = __asyncValues(watcher);
                    _b.label = 2;
                case 2: return [4 /*yield*/, watcher_1.next()];
                case 3:
                    if (!(watcher_1_1 = _b.sent(), !watcher_1_1.done)) return [3 /*break*/, 5];
                    _ = watcher_1_1.value;
                    updated = Date.now();
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(watcher_1_1 && !watcher_1_1.done && (_a = watcher_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(watcher_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/];
            }
        });
    }); })();
    var server = http_1.createServer(function (req, res) { return __awaiter(_this, void 0, void 0, function () {
        var url, _a, file, redirect, input;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    url = new URL((_b = req.url) !== null && _b !== void 0 ? _b : "", "http://" + req.headers.host);
                    if (url.searchParams.has("lastUpdated")) {
                        res.writeHead(200, { "Content-Type": "application/json" });
                        res.end(JSON.stringify({
                            updated: updated,
                        }));
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, pathToFile(posix_1.join(root, url.pathname), fallback)];
                case 1:
                    _a = __read.apply(void 0, [_c.sent(), 2]), file = _a[0], redirect = _a[1];
                    if (redirect) {
                        res.writeHead(302, { "Location": file });
                        res.end("");
                        return [2 /*return*/];
                    }
                    if (!file) {
                        res.writeHead(404, { "Content-Type": "text/plain" });
                        res.end("Not found");
                        return [2 /*return*/];
                    }
                    input = fs_1.createReadStream(file);
                    input.on("open", function () {
                        var mime = getMIME(file);
                        res.writeHead(200, { "Content-Type": mime });
                        input.pipe(res);
                    });
                    input.on("error", function (err) {
                        res.writeHead(500, { "Content-Type": "text/plain" });
                        res.end(err.message);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
    server.listen(port);
}
exports.serve = serve;
function getMIME(path) {
    var _a;
    return (_a = mime_1.default.getType(path)) !== null && _a !== void 0 ? _a : "binary/octetstream";
}
function pathToFile(path, fallback) {
    return __awaiter(this, void 0, void 0, function () {
        var stats, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, promises_1.stat(path)];
                case 1:
                    stats = _a.sent();
                    if (!stats) {
                        return [2 /*return*/, [undefined, false]];
                    }
                    if (stats.isDirectory()) {
                        return [2 /*return*/, pathToFile(posix_1.join(path, "index.html"), fallback)];
                    }
                    if (stats.isFile()) {
                        return [2 /*return*/, [path, false]];
                    }
                    return [2 /*return*/, [undefined, false]];
                case 2:
                    err_1 = _a.sent();
                    if (path.endsWith("/index.html") && !!fallback) {
                        return [2 /*return*/, [fallback, true]];
                    }
                    return [2 /*return*/, [undefined, false]];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=serve.js.map