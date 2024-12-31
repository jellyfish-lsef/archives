import htm from "../lib/htm.js";
import { Component, h } from "../lib/preact.js";
import { EditorActions } from "./editorActions.js";
import { MonacoEditor } from "./monaco/monaco.js";
const html = htm.bind(h);

export class Editor extends Component {
    render() {
        return html`
            <div id="monacoEditorContainer">
                <${MonacoEditor}/>
                <${EditorActions}/>
            </div>
        `;
    }
}
