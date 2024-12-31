import { Icon } from "../../components/iconRenderer.js";
import htm from "../../lib/htm.js";
import { Component, h } from "../../lib/preact.js";
import { VFSEntryRenderer } from "../vfs/frontend/VFSEntryRenderer.js";
import LocalScriptsSearchProvider from "./providers/localscripts.js";
import ScriptLibrarySearchProvider from "./providers/scriptLibrary.js";
import UserSearchProvider from "./providers/users.js";
const { ipcRenderer } = require("electron") as typeof import("electron");
const html = htm.bind(h);

const providers: { [key: string]: SearchProvider } = {
    "search-local": new LocalScriptsSearchProvider(),
    "search-cloudlibrary": new ScriptLibrarySearchProvider(),
    "search-users": new UserSearchProvider()
};

// eslint-disable-next-line @typescript-eslint/ban-types
export class SearchComponent extends Component<{}, { search: string, searchResults: Map<string, VfsEntry[]>, abort: AbortController }> {
    constructor() {
        super();
        this.state = { search: "", searchResults: new Map(), abort: new AbortController() };
        ipcRenderer.on("focus-search", () => (document.querySelector("#clearSearch") as HTMLInputElement).focus());
    }
    render() {
        const results = [];
        const providerKeys = Object.keys(providers);
        for (const result of Object.keys(providers)) {
            const provider = providers[result];
            if (this.state.searchResults.has(result)) {
                const resultss = this.state.searchResults.get(result);
                results.push(html`
                <div class="sidebarSection" >
                    <div class="sidebarSectionHeader">
                        <div class="sidebarSectionHeaderIcon">
                            <${Icon} icon=${provider.icon}/>
                        </div>
                        <div class="sidebarSectionHeaderText">
                            ${provider.name}
                        </div>
                    </div>
                    <div class="sidebarSectionContent">
                        ${resultss?.map((entry) => h(VFSEntryRenderer, { entry }))}
                    </div>
                </div>
                `);
            } else {
                results.push(html`
                <div class="sidebarSection" >
                    <div class="sidebarSectionHeader">
                        <div class="sidebarSectionHeaderIcon">
                            <${Icon} icon=${provider.icon}/>
                        </div>
                        <div class="sidebarSectionHeaderText">
                            ${provider.name}
                        </div>
                    </div>
                    <div class="sidebarSectionContent">
                        <p class="sidebarFolderLoading"><i class="material-symbols">refresh</i></p>
                    </div>
                </div>
                `);
            }
        }
        return html`
        <input type="text" placeholder="Search Fluidity" id="sidebarSearch" oninput=${this.oninput.bind(this)} />
        <button type="button" id="clearSearch" class="${this.state.search ? "visible" : "invisible"}" onclick=${this.clearSearch.bind(this)}>
            <i class="material-symbols">close</i>
        </button>
        <div id="searchResults" class=${this.state.search ? "visible" : "invisible"}>
            ${results}
            <div class="grow"></div>
        </div>
        
        `;
    }
    oninput() {
        const sidebarsearch = document.getElementById("sidebarSearch") as HTMLInputElement;
        this.state.abort?.abort();
        this.setState({ search: sidebarsearch.value, abort: new AbortController(), searchResults: new Map() });
        this.state.searchResults.clear();
        const oldSearch = this.state.search;
        if (sidebarsearch.value) {
            if (!oldSearch) {
                Object.keys(providers).forEach((providerKey) => {
                    const provider = providers[providerKey];
                    provider.startSearch((results) => {
                        this.state.searchResults.set(providerKey, results);
                        this.setState({ searchResults: this.state.searchResults });
                    });
                });
            }
            Object.values(providers).forEach((provider) => provider.searchChanged(sidebarsearch.value));
        } else {
            Object.values(providers).forEach((provider) => provider.cancelSearch());
        }
    }
    clearSearch() {
        (document.querySelector("#sidebarSearch") as HTMLInputElement).value = "";
        this.oninput();
    }
}