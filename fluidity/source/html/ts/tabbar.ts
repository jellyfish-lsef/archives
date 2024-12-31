import { Icon } from "./components/iconRenderer.js";
import { editorPromise, killModel, newModel } from "./editor/monaco/monaco.js";
import monacoPromise from "./editor/monaco/monacoLoader.js";
import htm from "./lib/htm.js";
import { Component, h } from "./lib/preact.js";
const { ipcRenderer } = require("electron") as typeof import("electron");
const html = htm.bind(h);

// eslint-disable-next-line @typescript-eslint/ban-types
export class TabBar extends Component<{}, {editor: monaco.editor.IStandaloneCodeEditor}> {
    render() {
        console.log("tabbar render!");
        if (!monaco) {
            return html` `;
        }
        ipcRenderer.send("setMenu", 0);
        return html`
            <div id="tabbar">

            <div id="tabbar-tabs" onwheel=${(event: WheelEvent) => (this.base?.firstChild as HTMLDivElement).scrollLeft += event.deltaX ? 0 : event.deltaY}>

                    ${monaco.editor.getModels().map((model) => {
        let icon = "description";
        let name = decodeURIComponent(model.uri.toString().split("/").pop()!);
        switch (model.uri.scheme) {
            case "swui-console":
                icon = "terminal";
                name = "Console";
                break;
            case "swui-settings":
                icon = "settings";
                name = "Settings";
                break;
            case "swui-script":
                const split = model.uri.path.split("/");
                split.shift();
                name = decodeURIComponent(split.shift()!);
                icon = decodeURIComponent(split.join("/"));
                break;
            case "swui-user":
                name = model.uri.authority;
                icon = decodeURIComponent(model.uri.path.replace("/", ""));
                break;
            case "fluiditytemp":
                icon = "text_snippet";
        }

        if (model.isAttachedToEditor()) ipcRenderer.send("setMenu", name);
        return html`
                            <div class="tabbar-tab ${model.isAttachedToEditor() ? "active" : ""}" onclick=${() => this.state.editor.setModel(model)}>
                                <span class="tabbar-tab-icon"><${Icon} icon=${icon}/></span>
                                <span class="tabbar-tab-title">${name}</span>
                                <button class="tabbar-tab-close" onclick=${() => killModel(model)}>
                                    <i class="material-symbols">close</i>
                                </button>
                            </div>
                        `;
    }
    )}
                </div>
                <button aria-label="New script tab" onclick=${() => newModel("")}>
                    <i class="material-symbols">add</i>
                </button>
            </div>`;
    }



    update() {
        console.log("tabbar update!");
        this.forceUpdate();
    }
    constructor() {
        ipcRenderer.on("close-tab", () => {
            killModel(this.state.editor.getModel()!);
        });
        ipcRenderer.on("new-tab", (e, arg) => newModel("", arg));
        super();
        monacoPromise.then((monaco) => {
            monaco.editor.onDidCreateModel(this.update.bind(this));
            monaco.editor.onWillDisposeModel(this.update.bind(this));
        });
        editorPromise.then((editor) => {
            this.setState({ editor });
            editor.onDidChangeModel(this.update.bind(this));
        });
    }
}
