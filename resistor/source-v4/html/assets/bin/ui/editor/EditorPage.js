import htm from "../../lib/htm.js";
import { Component, h } from "../../lib/preact.js";
import { ResistorTextEditor } from "./ResistorTextEditor.js";
import { ScriptsSidebar } from "./ScriptsSidebar.js";
import { EditorTabBar } from "./TabBar.js";
const html = htm.bind(h);
export class EditorPage extends Component {
    updateMonaco(editor) {
        this.setState({ editor });
    }
    render() {
        return html `<div class="page" id="page-editor">
            <div id="editor-container">
                ${this.state.editor ? html `<${EditorTabBar} editor="${this.state.editor}"/>` : ""}
                <${ResistorTextEditor} setMonaco="${this.updateMonaco.bind(this)}"/>
            </div>
            <${ScriptsSidebar}/>
        </div>`;
    }
}
