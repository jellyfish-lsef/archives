const { ipcRenderer } = require("electron") as typeof import("electron");
import { Component, h, render } from "./lib/preact.js";
import { LoginScreen } from "./login/LoginScreen.js";
import { FluidityApp } from "./mainAppUi.js";

// eslint-disable-next-line @typescript-eslint/ban-types
export class AppHost extends Component<{}, {loggedIn: boolean}> {
    render() {
        if (!this.state.loggedIn) {
            document.body.removeAttribute("loggedIn");
            ipcRenderer.send("setMenu", -1);
            return h(LoginScreen, { onLogin: () => this.setState({ loggedIn: true }) });
        } else {
            document.body.setAttribute("loggedIn", "true");
            return h(FluidityApp, {});
        }
    }
}




const parent = document.getElementById("appContainer")!;
parent.innerHTML = "";
render(h(AppHost, {}), parent);