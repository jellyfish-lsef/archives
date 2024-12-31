import swapi from "../../../api/SWAPI.js";

async function getScriptLibaryList(url: string, body: any) {
    const response = await swapi.makeDashboardApiRequest("scripts" + url, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } });
    const json = await response.json();
    return json.data.map((item: ScriptLibraryScriptInfo) => ({
        name: item.name,
        type: "file",
        uri: monaco.Uri.parse("swui-script://" + item.id + "/" + item.name.replace(/\//g, String.fromCharCode(8725)) + "/" + item.thumbnail),
        icon: item.thumbnail,
        content: "import(" + item.id + ")"
    } as VfsPathEntry));
}

export class CloudLibraryVFS implements IVFS {
    async readFile(path: monaco.Uri): Promise<string> {
        console.log("readFile", path);
        return path.toString();
    }
    async readDir(path: monaco.Uri): Promise<VfsEntry[]> {
        console.log("readDir", path);
        switch (path.path) {
            case "/saved":
                return getScriptLibaryList("/saved", {});
            case "/latest":
                return [{
                    uri: monaco.Uri.joinPath(path, "general"),
                    name: "General",
                    icon: "construction",
                    type: "directory"
                },
                {
                    uri: monaco.Uri.joinPath(path, "fun"),
                    name: "Fun",
                    icon: "sentiment_very_satisfied",
                    type: "directory"
                },
                {
                    uri: monaco.Uri.joinPath(path, "gamespecific"),
                    name: "Game Specific",
                    icon: "videogame_asset",
                    type: "directory"
                },
                {
                    uri: monaco.Uri.joinPath(path, "misc"),
                    name: "Miscellaneous",
                    icon: "science",
                    type: "directory"
                },
                {
                    uri: monaco.Uri.joinPath(path, "developer"),
                    name: "Developer",
                    icon: "developer_board",
                    type: "directory"
                }, { type: "seperator" }, ...await getScriptLibaryList("", { })];
            case "/featured":
                return getScriptLibaryList("", { category: "Featured Scripts" });
            case "/latest/general":
                return getScriptLibaryList("", { category: "General" });
            case "/latest/fun":
                return getScriptLibaryList("", { category: "Fun" });
            case "/latest/gamespecific":
                return getScriptLibaryList("", { category: "Game Specific" });
            case "/latest/misc":
                return getScriptLibaryList("", { category: "Miscellaneous" });
            case "/latest/developer":
                return getScriptLibaryList("", { category: "Developer Scripts" });
            default:
                return [
                    {
                        uri: monaco.Uri.joinPath(path, "saved"),
                        name: "Saved Scripts",
                        icon: "bookmark",
                        type: "directory"
                    },
                    {
                        uri: monaco.Uri.joinPath(path, "featured"),
                        name: "Featured",
                        icon: "star",
                        type: "directory"
                    },
                    {
                        uri: monaco.Uri.joinPath(path, "latest"),
                        name: "Latest",
                        icon: "new_releases",
                        type: "directory"
                    }

                ];
        }
    }
}