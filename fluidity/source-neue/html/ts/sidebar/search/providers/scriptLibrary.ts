import swapi from "../../../api/SWAPI.js";

export default class ScriptLibrarySearchProvider implements SearchProvider {
    name = "Script Library";
    icon = "filter_drama";

    callback: (results: VfsEntry[]) => void;
    constructor() {
        this.callback = () => { /**/ };
    }
    startSearch(callback: (results: VfsEntry[]) => void): void {
        this.callback = callback;
    }
    abort = new AbortController();
    async searchChanged(search: string): Promise<void> {
        if (this.abort) this.abort.abort();

        this.abort = new AbortController();
        const response = await swapi.makeDashboardApiRequest("scripts", {
            method: "POST",
            body: JSON.stringify({
                from: 0,
                queryString: search
            }),
            signal: this.abort.signal,
            headers: { "Content-Type": "application/json" }
        });
        const json = await response.json() as {data: ScriptLibraryScriptInfo[]};
        this.callback(json.data.sort((a, b) => a.total_saves - b.total_saves).map((item) => ({
            name: item.name,
            type: "file",
            uri: monaco.Uri.parse("swui-script://" + item.id + "/" + item.name.replace(/\//g, String.fromCharCode(8725)) + "/" + item.thumbnail),
            icon: item.thumbnail,
            content: "import(" + item.id + ")"
        } as VfsPathEntry)));
    }
    cancelSearch(): void {
        console.log("end search");
        //
    }
}