import { getScriptPaths } from "../../fsio.js";
import { pathsToTree } from "../../helpers.js";
import htm from "../../lib/htm.js";
import { Component, h } from "../../lib/preact.js";
import MessageBus from "../messageBus.js";
import { RunFab } from "./RunFab.js";
const html = htm.bind(h);
export class ScriptsSidebar extends Component {
    update() {
        getScriptPaths().then((paths) => {
            this.setState({ paths, open: true });
        });
    }
    constructor() {
        super();
        this.setState({
            paths: []
        });
        MessageBus.on("setPage", (page) => {
            if (page !== "editor")
                return;
            this.update();
        });
        this.update();
    }
    branchToHtml(branch) {
        return Object.keys(branch).map((key) => {
            const script = branch[key];
            return html `<div 
                tabindex="-1" 
                class="script script-type-${typeof script}" 
                onclick=${typeof script == "string" ? () => MessageBus.emit("createEditorTab", script, key) : null}
                >
                <i class="material-icons">${typeof script == "string" ? "description" : "folder"}</i> ${key}
                ${typeof script !== "string" ? this.branchToHtml(script) : null}
            </div>`;
        });
    }
    render() {
        return html `
            <div id="scripts-sidebar" class="${this.state.open ? "open" : "closed"}">
                <a id="script-sidebar-toggle" class="glowyLink" href="#" onclick=${() => this.setState({ open: !this.state.open })}>
                    <i class="material-icons">arrow_forward_ios</i>
                </a>
                <div id="scripts-sidebar-contents">
                    ${this.branchToHtml(pathsToTree(this.state.paths.sort()))}
                </div>
                <!-- Ideally this would be in the EditorPage, not the ScriptSideBar,
                     but I wanted it to always be in the bottom right of the editor,
                     and move with the sidebar, and I couldn't figure a way to do 
                     that without putting it here                               -->
                <${RunFab} />
            </div>
        `;
    }
}
