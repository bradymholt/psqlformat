"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const child_process_1 = require("child_process");
function format(text) {
    let pgFormatterPath = path.resolve(__dirname, "../vendor/pgFormatter/pg_format");
    let command = `perl ${pgFormatterPath}`;
    let result = child_process_1.execSync(command, {
        encoding: "utf8",
        input: text
    });
    return result;
}
exports.default = format;
