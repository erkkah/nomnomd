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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyFiles = exports.separateFilesByExtension = exports.resolveFiles = exports.isDir = exports.isFile = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
function isFile(path) {
    var _a;
    var stats = fs_1.statSync(path, { throwIfNoEntry: false });
    return (_a = stats === null || stats === void 0 ? void 0 : stats.isFile()) !== null && _a !== void 0 ? _a : false;
}
exports.isFile = isFile;
function isDir(path) {
    var _a;
    var stats = fs_1.statSync(path, { throwIfNoEntry: false });
    return (_a = stats === null || stats === void 0 ? void 0 : stats.isDirectory()) !== null && _a !== void 0 ? _a : false;
}
exports.isDir = isDir;
function resolveFiles(files, recursive) {
    var seen = new Set();
    var cwd = process.cwd();
    var unresolved = __spreadArray([], __read(files));
    var resolved = [];
    var _loop_1 = function () {
        var file = unresolved.shift() || "";
        if (isDir(file)) {
            if (recursive) {
                var files_1 = fs_1.readdirSync(file).map(function (item) { return path_1.join(file, item); });
                unresolved.push.apply(unresolved, __spreadArray([], __read(files_1)));
            }
        }
        else if (isFile(file)) {
            var abs = file;
            if (!path_1.isAbsolute(abs)) {
                abs = path_1.join(cwd, file);
            }
            if (!seen.has(abs)) {
                seen.add(abs);
                resolved.push(file);
            }
        }
    };
    while (unresolved.length) {
        _loop_1();
    }
    return resolved;
}
exports.resolveFiles = resolveFiles;
function separateFilesByExtension(files, extension) {
    var e_1, _a;
    var markdown = [];
    var others = [];
    try {
        for (var files_2 = __values(files), files_2_1 = files_2.next(); !files_2_1.done; files_2_1 = files_2.next()) {
            var file = files_2_1.value;
            if (file.endsWith(extension)) {
                markdown.push(file);
            }
            else {
                others.push(file);
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (files_2_1 && !files_2_1.done && (_a = files_2.return)) _a.call(files_2);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return [markdown, others];
}
exports.separateFilesByExtension = separateFilesByExtension;
function copyFiles(files, target) {
    var e_2, _a;
    try {
        for (var files_3 = __values(files), files_3_1 = files_3.next(); !files_3_1.done; files_3_1 = files_3.next()) {
            var file = files_3_1.value;
            var fileDir = path_1.join(target, path_1.dirname(file));
            fs_1.mkdirSync(fileDir, { recursive: true });
            fs_1.copyFileSync(file, path_1.join(fileDir, path_1.basename(file)));
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (files_3_1 && !files_3_1.done && (_a = files_3.return)) _a.call(files_3);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
exports.copyFiles = copyFiles;
//# sourceMappingURL=files.js.map