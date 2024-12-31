import swapi from "../api/SWAPI.js";
import { Component, h } from "../lib/preact.js";

// eslint-disable-next-line @typescript-eslint/ban-types
export class LoginAvailability extends Component<{}, {customDescription: false | string, status: "online" | "limited" | "offline", title: string}> {
    render() {
        if (!this.state.status) return;
        let statusIcon = "error";
        if (this.state.status === "online") statusIcon = "check";
        else if (this.state.status === "limited") statusIcon = "warning";

        let statusTitle = "";
        let statusText = "";
        if (typeof this.state.customDescription === "string") {
            statusText = this.state.customDescription?.replace(/<#\d+>/g, "our Discord channel").replace(/<@\d+>/g, "Fluidity staff");
        }
        if (this.state.status == "online") {
            statusTitle = "Fully working!";
        } else if (this.state.status == "limited") {
            statusTitle = "Limited availability";
        } else {
            statusTitle = "Currently unavailable.";
        }
        return (
            <a href="https://discord.gg/" target="_blank" class="loginStatus" data-status={this.state.status}>
                <div class="loginStatusLight">
                    <i class="material-symbols">{statusIcon}</i>
                </div>
                <div class="loginStatusText">
                    <div class="loginStatusName">{statusTitle}</div>
                    <div class="loginStatusStatus" >{statusText}</div>
                </div>
                <div class="loginStatusLink">
                    <i class="material-symbols">chevron_right</i>
                </div>
            </a>
        );
    }
    constructor() {
        super();
        if (1) {
            this.setState({ status: "offline", customDescription: "RIP lol" });
            return this;
        }
        fetch(swapi.API_BASE + "/api/statuses").then((res) => res.json()).then((data) => {
            this.setState(data.macos);
        });
    }
}
