import htm from "../../lib/htm.js";
import { Component, h } from "../../lib/preact.js";
import MessageBus from "../messageBus.js";
import monacoPromise from "./monaco/monacoLoader.js";
const html = htm.bind(h);
const fs = require("fs");
export class ResistorTextEditor extends Component {
    shouldComponentUpdate() { return false; }
    createEditorTab(path, value) {
        if (path && value == null) {
            value = fs.readFileSync(path, "utf8");
        }
        let uri;
        if (path) {
            uri = monaco.Uri.file(path);
            if (monaco.editor.getModel(uri))
                return this.state.editor.setModel(monaco.editor.getModel(uri));
            value = fs.readFileSync(path, "utf8");
        }
        const model = monaco.editor.createModel(value || "", "lua", uri);
        this.state.editor.setModel(model);
    }
    componentDidMount() {
        monacoPromise.then((monaco) => {
            const editor = monaco.editor.create(this.base, {
                value: "Loading...",
                automaticLayout: true,
                language: "lua"
            });
            this.setState({ editor });
            this.props.setMonaco(editor);
            MessageBus.on("createEditorTab", this.createEditorTab.bind(this));
            setTimeout(() => this.createEditorTab(undefined, "print(\"Welcome to Jellyfish 4!\")"));
        }).catch((err) => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            this.base.innerHTML = `<pre style="color: red;">${err}</pre>`;
        });
    }
    componentWillUnmount() {
        this.state.editor.dispose();
    }
    render() {
        return html `<div class='resistor-text-editor'></div>`;
    }
}
