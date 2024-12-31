const fs = require("fs") as typeof import("fs");
const os = require("os") as typeof import("os");
const Path = require("path") as typeof import("path");

export const vfsFsMap = new Map<string, string>();
vfsFsMap.set("scripts", Path.join(os.homedir(), "Documents", "Fluidity", "Scripts"));

if (!fs.existsSync(Path.join(os.homedir(), "Documents", "Fluidity"))) fs.mkdirSync(Path.join(os.homedir(), "Documents", "Fluidity"));
if (!fs.existsSync(Path.join(os.homedir(), "Documents", "Fluidity", "Scripts"))) fs.mkdirSync(Path.join(os.homedir(), "Documents", "Fluidity", "Scripts"));

export function vfsPathToRealPath(path: monaco.Uri) {
    return Path.join(vfsFsMap.get(path.authority)!, path.path);
}


export class FileSystemVFS implements IVFS {
    async readFile(path: monaco.Uri): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.scheme == "vfs-fs" ? vfsPathToRealPath(path) : path.fsPath, "utf8", (err, data) => {
                    if (err) reject(err);
                    else resolve(data);
                });
        });
    }
    async readDir(path: monaco.Uri): Promise<VfsEntry[]> {
        return new Promise((resolve, reject) => {
            const p = vfsPathToRealPath(path);
            fs.readdir(p, (err, files) => {
                if (err) { reject(err); } else {
                    resolve(files
                        .map((file) => {
                            const filePath = Path.join(path.path, file);
                            const realPath = Path.join(p, file);
                            const fileStat = fs.statSync(realPath);
                            return {
                                uri: fileStat.isDirectory() ? monaco.Uri.parse(`vfs-fs://${path.authority}${filePath}`) : monaco.Uri.parse(`file://${realPath}`),
                                name: file,
                                icon: fileStat.isDirectory() ? "folder" : "description",
                                type: fileStat.isDirectory() ? "directory" : "file"
                            } as VfsPathEntry;
                        })
                        .filter((f) => f.type == "directory" || f.name.endsWith(".txt") || f.name.endsWith(".lua"))
                        .sort((a: VfsPathEntry, b: VfsPathEntry) => {
                            if (a.type === "directory" && b.type === "file") return -1;
                            if (a.type === "file" && b.type === "directory") return 1;
                            return a.name.localeCompare(b.name);
                        }));
                }
            });
        });
    }
}