export default class TestSearchProvider implements SearchProvider {
    name = "Search Test";
    icon = "search";

    callback: (results: VfsEntry[]) => void;
    constructor() {
        this.callback = () => { /**/ };
    }
    startSearch(callback: (results: VfsEntry[]) => void): void {
        console.log("start search");
        this.callback = callback;
    }
    searchChanged(search: string): void {
        console.log(search);
        this.callback([
            {
                type: "file",
                uri: monaco.Uri.parse("file:///home/user/test.txt"),
                name: search,
                icon: "search"
            }
        ]);
    }
    cancelSearch(): void {
        console.log("end search");
        //
    }
}