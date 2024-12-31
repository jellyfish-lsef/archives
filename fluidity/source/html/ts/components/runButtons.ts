import htm from "../lib/htm.js";
import { Component, h } from "../lib/preact.js";
const ipcRenderer = require("electron").ipcRenderer;
const html = htm.bind(h);


// eslint-disable-next-line @typescript-eslint/ban-types
export class RunButtons extends Component<{getScript: () => Promise<string> | string, type: string}, InjectionStatus> {
    render() {
        const output = [];
        for (const pid in this.state.processes) {
            const proc = this.state.processes[pid];
            output.push(html`<button class="${this.props.type} ${proc.status ? "glowing" : ""}"  onclick=${() => this.runScript(parseInt(pid))} id="runButton" style="--pid: ${pid}">
                <i class="material-symbols">play_arrow</i>
                ${proc.status || proc.userDisplayName || proc.userName || "Run"}
            </button>`);
        }
        return output;
    }
    updateState: (event: any, state: string) => void;

    async runScript(pid: number) {
        ipcRenderer.send("newcomms-run-script", { pid, script: await this.props.getScript() });
    }
    constructor() {
        super();
        this.updateState = ((event:any, status:string) => {
            this.setState(JSON.parse(status));
        }).bind(this);
    }
    componentWillMount() {
        ipcRenderer.invoke("getStatus");
        ipcRenderer.on("injection-status", this.updateState);
    }
    componentWillUnmount() {
        ipcRenderer.removeListener("injection-status", this.updateState);
    }
}
