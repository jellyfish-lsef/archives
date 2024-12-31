const Path = require("path") as typeof import("path");
const os = require("os") as typeof import("os");
const fs = require("fs") as typeof import("fs");

export default class LocalScriptsSearchProvider implements SearchProvider {
    name = "Local Scripts";
    icon = "laptop_mac";

    callback: (results: VfsEntry[]) => void;
    search = "";
    root = Path.join(os.homedir(), "Documents", "Fluidity", "Scripts");
    constructor() {
        this.callback = () => { /**/ };
    }
    discovered: VfsPathEntry[] = [];
    results: VfsPathEntry[] = [];
    running = false;

    crawl(dir:string) {
        if (!this.running) return;

        fs.readdir(dir, { withFileTypes: true }, (err, files) => {
            if (err || !this.running) return;
            for (const file of files) {
                const path = Path.join(dir, file.name);
                if (file.isDirectory()) {
                    this.crawl(path);
                } else if (file.isFile() && (file.name.endsWith(".lua") || file.name.endsWith(".txt"))) {
                    this.discovered.push({
                        name: file.name,
                        type: "file",
                        uri: monaco.Uri.parse("file://" + path),
                        icon: "document",
                        content: ""
                    } as VfsPathEntry);
                }
            }
        });
    }

    startSearch(callback: (results: VfsEntry[]) => void): void {
        this.callback = callback;

        this.running = true;

        this.discovered = [];
        this.results = [];
        this.crawl(this.root);
    }
    abort = new AbortController();
    async searchChanged(search: string): Promise<void> {
        this.search = search;
        this.results = this.discovered.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
        this.callback(this.results);
    }
    cancelSearch(): void {
        console.log("end search");
        this.running = false;
        this.discovered = [];
        this.results = [];
    }
}