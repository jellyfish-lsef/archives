import { RunButtons } from "../components/runButtons.js";
import htm from "../lib/htm.js";
import { Component, h } from "../lib/preact.js";
import { vfsFsMap } from "../sidebar/vfs/backend/fs.js";
import { Toast } from "../toasts/toastManager.js";
import { editorPromise, newModel } from "./monaco/monaco.js";
const html = htm.bind(h);
const ipcRenderer = require("electron").ipcRenderer;

// eslint-disable-next-line @typescript-eslint/ban-types
export class EditorActions extends Component<{}, {injectionStatus: InjectionStatus, isSaving: boolean, lspStatus:any}> {
    render() {
        return html`
        <div class="actionsPanel" id="editorActions" onwheel=${(event: WheelEvent) => (this.base?.firstChild as HTMLDivElement).scrollLeft += event.deltaX ? 0 : event.deltaY}>
            <${RunButtons} type="editorActionButton" getScript=${async() => (await editorPromise).getValue()}/>
            <button class="editorActionButton ${this.state.injectionStatus?.globalStatus ? "glowing" : ""}" onclick=${(evt:MouseEvent) => {
    console.log(ipcRenderer.invoke("inject", evt.shiftKey));
}} id="injectButton">
                <i class="material-symbols">memory</i>
                <p class='text'>${this.state.injectionStatus?.globalStatus}</p>
            </button>

            <button class="editorActionButton" id="saveButton" isBusy=${this.state.isSaving} onclick=${this.save.bind(this)}>
                <i class="material-symbols">save</i>
            </button>
<!--
            <button class="editorActionButton" id="saveButton">
                <i class="material-symbols">ios_share</i>
                Send
            </button>
-->
            <!--<span class="lspStatus">${this.state.lspStatus}</span>!-->

        </div>
        `;
    }

    async save(event: MouseEvent) {
        // this function is way more complicated than it should be
        this.setState({ isSaving: true });
        const cmodel = (await editorPromise).getModel()!;
        const script = cmodel.getValue();
        const uri = cmodel.uri;

        const origPath = uri.scheme === "file" && uri.fsPath;
        let path = origPath;
        const suggestedPath = uri.scheme === "file" ? origPath : vfsFsMap.get("scripts")! + "/" + (uri.path.split("/").pop() || uri.authority);
        if (!path || event.shiftKey) {
            const result = await ipcRenderer.invoke("saveDialog", suggestedPath);
            this.setState({ isSaving: false });
            if (!result.filePath) return;
            path = result.filePath;
        }
        (require("fs") as typeof import("fs")).writeFile(path as string, script, {}, (err) => {
            if (err) {
                new Toast({
                    icon: "error",
                    title: "Couldn't save",
                    message: err.message,
                    type: "danger",
                    timeout: 3000
                });
                this.setState({ isSaving: false });
                return;
            }
            if (path !== origPath) {
                cmodel.dispose();
                newModel(script, monaco.Uri.parse("file://" + path));
            }
            this.setState({ isSaving: false });
        });
    }

    componentWillMount() {
        ipcRenderer.invoke("getStatus");
        ipcRenderer.on("injection-status", (evt:any, data:string) => {
            console.log(data);
            this.setState({ injectionStatus: JSON.parse(data) });
        });
        ipcRenderer.on("languageServer", (evt:any, data:string) => {
            if (!data.includes("$/status/report")) return;
            const p = JSON.parse(data);
            if (p.method == "$/status/report") {
                this.setState({ lspStatus: html`<b>${p.params.text.startsWith("$(loading~spin)") ? h("i", { class: "material-symbols spin" }, "refresh") : ""}${p.params.text.replace("$(loading~spin)", "")}</b> <span> ${p.params.tooltip}</span>` });
            }
        });
        ipcRenderer.on("save-tab", (_, saveAs: boolean) => this.save(new MouseEvent("click", { shiftKey: saveAs })));
    }
}
