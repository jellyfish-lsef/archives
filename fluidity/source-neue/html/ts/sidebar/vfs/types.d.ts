/* eslint-disable no-shadow */
interface VfsPathEntry {
    uri: monaco.Uri;
    name: string;
    icon: string;
    type: "file" | "directory";
    content?: string;
}
type VfsEntry = VfsPathEntry | { type: "seperator" };

interface IVFS {
    readFile(path: monaco.Uri): Promise<string>;
    readDir(path: monaco.Uri): Promise<VfsEntry[]>;
}

interface SearchProvider {
    name: string;
    icon: string;
    startSearch(callback: (results: VfsEntry[]) => void): void;
    searchChanged(search: string): void;
    cancelSearch(): void;
}