const path = require("path");
const os = require("os");
const fs = require("fs");
const walker = require("walker");
export const JELLYFISH_DATA_DIR = path.join(os.homedir(), "Documents", "Jellyfish");
export const JELLYFISH_SCRIPTS_DIR = path.join(JELLYFISH_DATA_DIR, "Scripts");
function ensureDataDirs() {
    if (!fs.existsSync(JELLYFISH_DATA_DIR))
        fs.mkdirSync(JELLYFISH_DATA_DIR);
    if (!fs.existsSync(JELLYFISH_SCRIPTS_DIR))
        fs.mkdirSync(JELLYFISH_SCRIPTS_DIR);
}
export function getScriptPaths() {
    return new Promise((resolve) => {
        const files = [];
        walker(JELLYFISH_SCRIPTS_DIR).on("file", (entry) => {
            files.push(entry);
        }).on("end", () => { resolve(files); });
    });
}
ensureDataDirs();
