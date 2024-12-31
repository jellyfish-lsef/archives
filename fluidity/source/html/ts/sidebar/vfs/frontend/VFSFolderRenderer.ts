import htm from "../../../lib/htm.js";
import { Component, h } from "../../../lib/preact.js";
import vfs from "../vfs.js";
import { VFSEntryRenderer } from "./VFSEntryRenderer.js";
const html = htm.bind(h);

export class VFSFolderRenderer extends Component<{path: monaco.Uri}, {contents: VfsEntry[], message:null | string}> {
    render() {
        if (!this.state.contents) { return html`<p class="sidebarFolderLoading">${this.state.message || h("i", { class: "material-symbols" }, "refresh")}</p>`; }
        return html`
            <div class="vfs-folder">
                ${this.state.contents.map((entry) => h(VFSEntryRenderer, { entry }))}
            </div>
        `;
    }
    async componentWillMount() {
        setTimeout(() => {
            if (!this.state.message) this.setState({ message: null });
        }, 100);
        try {
            const contents = await vfs.readDir(this.props.path);
            this.setState({ contents, message: undefined });
        } catch (e) {
            this.setState({ message: (e as Error).message });
        }
    }
}
