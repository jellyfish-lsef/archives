import swapi from "../api/SWAPI.js";
import htm from "../lib/htm.js";
import { Component, h } from "../lib/preact.js";
const html = htm.bind(h);

// eslint-disable-next-line @typescript-eslint/ban-types
export class LoginStatus extends Component<{}, {customDescription: false | string, status: "online" | "limited" | "offline", title: string}> {
    render() {
        if (!this.state.status) return;
        let statusIcon = "clear";
        if (this.state.status === "online") statusIcon = "check";
        else if (this.state.status === "limited") statusIcon = "warning";
        let statusText = "";
        if (typeof this.state.customDescription === "string") {
            statusText = this.state.customDescription?.replace(/<#\d+>/g, "our Discord channel").replace(/<@\d+>/g, "our Discord");
        } else if (this.state.status == "online") {
            statusText = "Fully working!";
        } else if (this.state.status == "limited") {
            statusText = "Limited availability";
        } else {
            statusText = "Currently patched.";
        }
        return html`
            <div class="loginStatus">
                <div class="loginStatusLight" status="${this.state.status}">
                    <i class="material-symbols">${statusIcon}</i>
                </div>
                <div class="loginStatusText">
                    <div class="loginStatusName">${this.state.title} status</div>
                    <div class="loginStatusStatus">${statusText}</div>
                </div>
            </div>
        `;
    }
    constructor() {
        super();
        fetch(swapi.API_BASE + "/api/statuses").then((res) => res.json()).then((data) => {
            this.setState(data.macos);
        });
    }
}
