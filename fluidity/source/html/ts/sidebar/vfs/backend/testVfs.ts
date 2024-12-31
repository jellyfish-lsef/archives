export class TestVfs implements IVFS {
    async readFile(path: monaco.Uri): Promise<string> {
        console.log("readFile", path);
        return path.toString();
    }
    async readDir(path: monaco.Uri): Promise<VfsEntry[]> {
        console.log("readDir", path);
        switch (path.path) {
            case "/":
                return [
                    {
                        uri: monaco.Uri.joinPath(path, "test.lua"),
                        name: "Test",
                        icon: "description",
                        type: "file"
                    },
                    {
                        uri: monaco.Uri.joinPath(path, "exampledir"),
                        name: "Example Directory",
                        icon: "folder",
                        type: "directory"
                    },
                    {
                        uri: monaco.Uri.joinPath(path, "never"),
                        name: "Never load",
                        icon: "schedule",
                        type: "directory"
                    },
                    {
                        type: "seperator"
                    },
                    {
                        uri: monaco.Uri.parse("swui-script://18/test/science"),
                        name: "Script",
                        icon: "cloud",
                        type: "file"
                    }
                ];
            case "/exampledir":
                return [
                    {
                        uri: monaco.Uri.joinPath(path, "../folder2/test.lua"),
                        name: "It works!",
                        icon: "check",
                        type: "file"
                    },
                    {
                        uri: path,
                        name: "Recursion!",
                        icon: "repeat",
                        type: "directory"
                    }
                ];
            case "/never":
                // eslint-disable-next-line no-empty-function
                return new Promise(() => {});
            default:
                return [{
                    uri: path,
                    name: path.toString(),
                    icon: "check",
                    type: "file"
                }];
        }
    }
}