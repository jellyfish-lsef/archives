import { CloudLibraryVFS } from "./backend/cloudlibrary.js";
import { FriendVFS } from "./backend/friends.js";
import { FileSystemVFS } from "./backend/fs.js";
import { TestVfs } from "./backend/testVfs.js";
const { ipcRenderer } = require("electron");
class VFS {
    vfsMap: Map<string, ClassRef<IVFS>> = new Map();
    vfsInstanceMap: Map<string, IVFS> = new Map();
    registerVFS(scheme: string, vfs: ClassRef<IVFS>) {
        this.vfsMap.set(scheme, vfs);
    }

    resolveVFS(path: monaco.Uri): IVFS {
        const instanceId = path.scheme + "://" + path.authority;
        if (!this.vfsInstanceMap.has(instanceId)) {
            if (!this.vfsMap.has(path.scheme)) {
                throw new Error(`No VFS registered for scheme ${path.scheme}`);
            }
            console.log("Creating VFS instance for" + instanceId);
            const vfs = new (this.vfsMap.get(path.scheme) as ClassRef<IVFS>)(path.authority);
            this.vfsInstanceMap.set(instanceId, vfs);
        }
        return this.vfsInstanceMap.get(instanceId)!;
    }

    async readFile(path: monaco.Uri): Promise<string> {
        if (path.scheme.startsWith("swui-")) return "";
        const vfs = this.resolveVFS(path);
        return vfs.readFile(path);
    }
    async readDir(path: monaco.Uri): Promise<VfsEntry[]> {
        const vfs = this.resolveVFS(path);
        return vfs.readDir(path);
    }
}

class VFSPortal implements IVFS {
    readDir(path: monaco.Uri): Promise<VfsEntry[]> {
        return ipcRenderer.invoke("vfs-readdir", path.toJSON());
    }
    async readFile(path: monaco.Uri): Promise<string> {
        return ipcRenderer.invoke("vfs-readfile", path.toJSON());
    }
}
class NullVFS implements IVFS {
    async readDir(path: monaco.Uri): Promise<VfsEntry[]> {
        return [];
    }
    async readFile(path: monaco.Uri): Promise<string> {
        return "";
    }
}

const vfs = new VFS();
vfs.registerVFS("vfs-test", TestVfs);
vfs.registerVFS("vfs-fs", FileSystemVFS);
vfs.registerVFS("file", FileSystemVFS);
vfs.registerVFS("vfs-library", CloudLibraryVFS);
vfs.registerVFS("vfs-friends", FriendVFS);


(window as any).vfs = vfs;

export default vfs;