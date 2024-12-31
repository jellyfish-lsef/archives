import htm from "../lib/htm.js";
import { Component, h } from "../lib/preact.js";
import { inject } from "../uiBridge.js";
import MessageBus from "./messageBus.js";
const html = htm.bind(h);
export class Navbar extends Component {
    constructor() {
        super();
        this.setState({
            injectionStatus: "Loading..."
        });
        MessageBus.on("injectionStatus", (injectionStatus) => this.setState({ injectionStatus }));
    }
    render() {
        console.log("Navbar render");
        return html `<div id="navbar">
            <p id="navbar-brand">Jellyfish</p>
            <div id="navbar-tabs">
                <a class="navbar-tab ${this.props.active === "editor" ? "active" : ""}" id="editor-tab-link" href="#" onClick=${() => MessageBus.emit("setPage", "editor")}>Editor</a>
                <a class="navbar-tab ${this.props.active === "tools" ? "active" : ""}" id="tools-tab-link" href="#" onClick=${() => MessageBus.emit("setPage", "tools")}>Tools</a>
                <a class="navbar-tab ${this.props.active === "scripthub" ? "active" : ""}" id="scripthub-tab-link" href="#" onClick=${() => MessageBus.emit("setPage", "scripthub")}>More Scripts</a>
            </div>
            <button class="transparent-button" disabled=${this.state.injectionStatus ? "disabled" : ""} id="navbar-inject" onclick=${() => inject()}>
                ${this.state.injectionStatus ? this.state.injectionStatus : "Inject"}
            </button>
        </div>`;
    }
}
