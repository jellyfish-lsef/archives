
const path = require("path") as typeof import("path");
const os = require("os") as typeof import("os");
const fs = require("fs") as typeof import("fs");
const walker = require("walker") as typeof import("./walker").walker.default;

export const JELLYFISH_DATA_DIR = path.join(os.homedir(), "Documents", "Jellyfish");
export const JELLYFISH_SCRIPTS_DIR = path.join(JELLYFISH_DATA_DIR, "Scripts");

function ensureDataDirs() {
    if (!fs.existsSync(JELLYFISH_DATA_DIR)) fs.mkdirSync(JELLYFISH_DATA_DIR);
    if (!fs.existsSync(JELLYFISH_SCRIPTS_DIR)) fs.mkdirSync(JELLYFISH_SCRIPTS_DIR);
}

export function getScriptPaths(): Promise<string[]> {
    return new Promise((resolve) => {
        const files:string[] = [];
        walker(JELLYFISH_SCRIPTS_DIR).on("file", (entry: string) => {
            files.push(entry);
        }).on("end", () => { resolve(files); });
    });
}

ensureDataDirs();