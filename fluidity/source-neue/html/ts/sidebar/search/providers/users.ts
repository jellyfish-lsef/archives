import swapi from "../../../api/SWAPI.js";

export default class UserSearchProvider implements SearchProvider {
    name = "Users";
    icon = "group";

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
        const response = await swapi.makeClientApiRequest("client/friends/search/" + encodeURIComponent(search), {
            signal: this.abort.signal
        });
        const json = await response.json();
        this.callback(json.map((item: Friend) => ({
            name: item.username,
            type: "file",
            uri: monaco.Uri.parse("swui-user://" + item.username + "/" + item.avatar),
            icon: item.avatar
        } as VfsPathEntry)));
    }
    cancelSearch(): void {
        console.log("end search");
    }
}