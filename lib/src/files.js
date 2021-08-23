"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDir = exports.isFile = void 0;
var fs_1 = require("fs");
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
//# sourceMappingURL=files.js.map