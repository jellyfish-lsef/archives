import { newModel } from "../editor/monaco/monaco.js";
import htm from "../lib/htm.js";
import { Component, h } from "../lib/preact.js";
import { SearchComponent } from "./search/searchComponent.js";
import { vfsFsMap } from "./vfs/backend/fs.js";
import { TestVfs } from "./vfs/backend/testVfs.js";
import { VFSSidebarSection } from "./vfs/frontend/VFSSidebarSection.js";
const html = htm.bind(h);

const testVfs = new TestVfs();
export class Sidebar extends Component {
    render() {
        return html`
        <div id="sidebar">
            <${SearchComponent} />
            <div id="sidebarContent">

                <div class="sidebarSection">
                    <div class="sidebarSectionHeader">
                        <div class="sidebarSectionHeaderIcon">
                            <img src="./assets/img/logo.svg" height="24" />
                        </div>
                        <div class="sidebarSectionHeaderText">
                            Fluidity
                        </div>
                    </div>
                    <div class="sidebarSectionContent">
                        <a href="#" class="sidebarSectionContentItem" onclick=${() => newModel("", "swui-settings://")}>
                            <i class="material-symbols">settings</i>
                            Settings
                        </div>
                        <a href="#" class="sidebarSectionContentItem" onclick=${() => newModel("", "swui-console://")}>
                            <i class="material-symbols">terminal</i>
                            Console
                        </div>
                    </div>
                </div>
                <${VFSSidebarSection} defaultOpen=${true} root=${monaco.Uri.parse("vfs-library://scripts/")} title="Script Library" icon="filter_drama" buttons=${{}}/>
                <${VFSSidebarSection} defaultOpen=${true} root=${monaco.Uri.parse("vfs-fs://scripts/")} title="Local Scripts" icon="laptop_mac" buttons=${{ folder_open: () => require("electron").shell.openPath(vfsFsMap.get("scripts")!) }} />
                <${VFSSidebarSection} defaultOpen=${false} root=${monaco.Uri.parse("vfs-friends://friends/")} title="Friends" icon="group" buttons=${{}}/>
            </div>
        </div>
        `;
    }
}
