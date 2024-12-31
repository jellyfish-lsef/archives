import htm from "../../lib/htm.js";
import { Component, h } from "../../lib/preact.js";
import MessageBus from "../messageBus.js";
import monacoPromise from "./monaco/monacoLoader.js";
const html = htm.bind(h);
function modelURIToName(uri) {
    if (uri.scheme == "inmemory") {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return html `<i>unsaved ${parseInt(uri.path.split("/").pop()) - 1}</i>`;
    }
    else {
        return uri.path.split("/").pop();
    }
}
export class EditorTabBar extends Component {
    constructor() {
        super();
        monacoPromise.then((monaco) => {
            this.setState({ monaco });
            console.log("hello", this.props);
            if (!this.props.editor)
                return;
            this.props.editor.onDidChangeModel(() => this.setState({}));
            monaco.editor.onWillDisposeModel(() => this.setState({}));
            monaco.editor.onDidCreateModel(() => this.setState({}));
        });
    }
    closeModel(model) {
        if (model.isAttachedToEditor()) {
            const models = this.state.monaco.editor.getModels();
            const idx = models.indexOf(model);
            setTimeout(() => {
                if (models[idx - 1])
                    this.props.editor.setModel(models[idx - 1]);
                else if (models[idx + 1])
                    this.props.editor.setModel(models[idx + 1]);
            });
        }
        model.dispose();
    }
    render() {
        var _a, _b;
        if (!this.props.editor || !this.state.monaco) {
            return html `<p>Loading...</p>`;
        }
        // yes i should definately do this in the tab bar
        // best place for it 100% mhmm yes totally
        if (this.props.editor.getModel() == null) {
            // this is a hack because monaco's function for getting the dom element
            // returns null when there is no model
            (_a = document.querySelector(".resistor-text-editor")) === null || _a === void 0 ? void 0 : _a.classList.remove("populated");
        }
        else {
            console.log("populated!");
            (_b = document.querySelector(".resistor-text-editor")) === null || _b === void 0 ? void 0 : _b.classList.add("populated");
        }
        return html `<div class="tabbar">
            ${this.state.monaco.editor.getModels().map((model) => {
            const ht = html `
            <a class="tab ${model.isAttachedToEditor() ? "active" : ""}" onClick=${() => this.props.editor.setModel(model)}>
                ${modelURIToName(model.uri)}
                <a class="close-tab" onClick=${() => this.closeModel(model)}>
                    <i class="material-icons glowylink">close</i>
                </a>
            </a>`;
            return ht;
        })}
            <a class="tab" href="#" onClick=${() => MessageBus.emit("createEditorTab")}>
                <i class="material-icons glowylink">add</i>
            </a>
        </div>`;
    }
}
