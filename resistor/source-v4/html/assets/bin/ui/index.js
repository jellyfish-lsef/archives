import htm from "../lib/htm.js";
import { Component, h, render as renderComponent } from "../lib/preact.js";
import { EditorPage } from "./editor/EditorPage.js";
import MessageBus from "./messageBus.js";
import { Navbar } from "./navbar.js";
import { Titlebar } from "./titlebar.js";
import { ToolsPage } from "./tools/ToolsPage.js";
const html = htm.bind(h);
class Application extends Component {
    constructor() {
        super();
        this.state = {
            page: "editor",
            title: "Editor",
            injectionStatus: "Loading"
        };
        MessageBus.on("titleChange", (title) => this.setState({ title }));
        MessageBus.on("setPage", (page) => this.setState({ page }));
    }
    render() {
        return html `
            <div class="app">
                <${Titlebar} text="${this.state.title}"/>
                <${Navbar} active=${this.state.page} />
                <div id="app-content" page="${this.state.page}">
                    <${EditorPage}/>
                    <${ToolsPage}/>
                    <div class="page" id="page-scripthub"><h1>Sorry</h1>This page is currently under construction.</div>
                </div>
            </div>
        `;
    }
}
export default function render() {
    renderComponent(html `<${Application} />`, document.body);
}
