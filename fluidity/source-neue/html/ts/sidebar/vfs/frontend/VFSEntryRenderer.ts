import { Icon } from "../../../components/iconRenderer.js";
import { newModel } from "../../../editor/monaco/monaco.js";
import htm from "../../../lib/htm.js";
import { Component, h, VNode } from "../../../lib/preact.js";
import vfs from "../vfs.js";
import { VFSFolderRenderer } from "./VFSFolderRenderer.js";
const html = htm.bind(h);

export class VFSEntryRenderer extends Component<{entry: VfsEntry}, {isOpen:boolean}> {
    render(): VNode<any> | VNode<any>[] {
        if (this.props.entry.type == "seperator") {
            return html`<hr class="sidebarSectionContentItemSeparator"></hr>`;
        }
        const entry = this.props.entry as VfsPathEntry;
        return html`<a href="#" class="sidebarSectionContentItem" id=${entry.uri} onclick=${this.onclick.bind(this)} type=${this.props.entry.type} isOpen=${this.state.isOpen}>
            <${Icon} icon=${this.props.entry.icon}/>
            ${entry.name}
            <div class='grow'></div>
            ${entry.type == "directory" ? html`<i class="material-symbols">${this.state.isOpen ? "expand_less" : "expand_more"}</i>` : ""}
            </a>
            ${this.state.isOpen ? h(VFSFolderRenderer, { path: entry.uri }) : ""}
            `;
    }
    async onclick(event: MouseEvent) {
        const path = event.composedPath();
        const found = path.find((el) => (el as HTMLElement).classList.contains("sidebarSectionContentItem"));
        console.log(found, this.base);
        if (found !== this.base) return;
        if (this.props.entry.type == "directory") {
            this.setState({ isOpen: !this.state.isOpen });
        } else {
            const entry = (this.props.entry as VfsPathEntry);
            newModel(entry.content || await vfs.readFile(entry.uri), entry.uri);
        }
    }
}
