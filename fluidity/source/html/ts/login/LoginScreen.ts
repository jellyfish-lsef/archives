import swapi from "../api/SWAPI.js";
import friendsManager from "../friends/logic/friendManager.js";
import htm from "../lib/htm.js";
import { Component, h } from "../lib/preact.js";
import { Toast } from "../toasts/toastManager.js";
import { LoginStatus } from "./loginStatus.js";
const html = htm.bind(h);
const { ipcRenderer } = require("electron");

type Accounts = {account: string, password: string}[];

function getUserImage(username: string) {
    try {
        const userinfo = localStorage.getItem("cachedUserInfo_" + username);
        if (!userinfo) return;
        const userinfojson = JSON.parse(userinfo);
        return userinfojson.avatar;
    } catch (e) {

    }
}

export class LoginScreen extends Component<{onLogin: () => void}, {
    savedAccounts: Accounts
    isBusy: boolean;
    needsHWIDVerification: boolean;
    errorText: string;
}> {
    render() {
        const output = [];
        if (this.state.needsHWIDVerification) {
            output.push(html`<input type="text" placeholder="Verification code" id="login2fa" />
            <button class="navigationLink" onclick=${() => this.confirm2fa()}>
                Confirm
            </button>`);
        } else if (this.state.savedAccounts.length > 0) {
            for (const account of this.state.savedAccounts) {
                output.push(html`<button class="loginAccount" onclick=${() => this.login(account.account, account.password)}>
                    <img src="${getUserImage(account.account) || "./assets/img/profile.png"}" height="50" />
                    <span>
                        <p>Continue as</p>
                        <b>${account.account}</b>
                    </span>
                </button>`);
            }
            output.push(html`
                <button class="navigationLink" onclick=${() => this.setState({ savedAccounts: [] })}>
                    Not you?
                </button>
            `);
        } else {
            output.push(html`
                <input type="text" placeholder="Username" id="loginUsername" />
                <input type="password" placeholder="Password" id="loginPassword" />
                <button class="navigationLink" onclick=${() => this.login()}>
                    Log in
                </button>
                <button class="navigationLink" onclick=${() => open("https://dashboard.fluidity.com/")}>
                    Forgot your password?
                </button>
                <button class="navigationLink" onclick=${() => open("https://fluidity.com/m")}>
                    Purchase Fluidity M
                </button>
            `);
        }

        return html`
            <div id="loginBackground"></div>
            <div id="loginBar">
                <div id="loginBarHeader">
                    <img src="./assets/img/logo.svg" alt="Fluidity Logo" height="150"/>
                    <h1>Welcome to Fluidity</h1>
                </div>
                <div id="loginBarBody" isBusy="${this.state.isBusy}">
                    <p>${this.state.errorText}</p>
                    ${output}
                    <button class="navigationLink" onclick=${() => open(this.state.needsHWIDVerification ? "https://dashboard.fluidity.com/support" : "mailto:admin@fluidity.com")}>
                        Need help?
                    </button>
                </div>
                <div class="grow"></div>
                <div id="loginBarFooter">
                    <img src="./assets/img/logo.svg" alt="Fluidity Logo" height="48"/>
                    <p>${require("../package.json").version} - © Fluidity</p>
                </div>
            </div>
            <${LoginStatus}/>

        `;
    }
    confirm2fa() {
        const code = (document.getElementById("login2fa") as HTMLInputElement).value;
        if (!code) {
            this.setState({ errorText: "Please enter a verification code" });
            return;
        }
        this.setState({ isBusy: true });
        ipcRenderer.invoke("auth", [code]).then(async(output: string) => {
            const split = output.split(".");
            if (split[0] == "true") {
                this.setState({ isBusy: false, needsHWIDVerification: false, errorText: "Your Fluidity account has been registered for use on this computer, you may now login!" });
            } else {
                this.setState({ isBusy: false, errorText: "An error occured, please double check the code. (error: " + split[1] + ")" });
            }
        });
    }
    login(username?: string, password?: string) {
        this.setState({
            isBusy: true
        });
        if (!username) {
            username = (document.getElementById("loginUsername") as HTMLInputElement).value;
        }
        if (!password) {
            password = (document.getElementById("loginPassword") as HTMLInputElement).value;
        }
        if (!username || !password) {
            this.setState({
                savedAccounts: [{ account: "username", password: "password" }],
                isBusy: false
            });

            return;
        }
        /* ipcRenderer.invoke("auth", [username, password])*/ Promise.resolve("true.1000.hello").then(async(output: string) => {
            try {
                const [success, code, authToken] = output.split(".");
                if (success == "true") {
                    swapi.clientAuthToken = authToken;
                    ipcRenderer.send("authenticated", authToken);
                    await swapi.ensureDashboardAuthToken();
                    this.props.onLogin();

                    localStorage.setItem("cachedUserInfo_" + swapi.userInfo!.username, JSON.stringify(swapi.userInfo!));
                    friendsManager.connectToRt();
                    new Toast({
                        icon: "waving_hand",
                        title: "Welcome,",
                        message: swapi.userInfo!.username + "!",
                        type: "accent",
                        timeout: 3000
                    });
                } else {
                    let message = "An unknown error occurred (code: " + code + ")";
                    switch (code) {
                        case "9999":
                            message = "To protect our customers, Fluidity is temporarily unavailable. Please try again later.";
                            break;
                        case "1001":
                            message = "The username or password you entered is incorrect.";
                            break;
                        case "1002":
                            this.setState({
                                savedAccounts: [{ account: username!, password: password! }],
                                needsHWIDVerification: true,
                                errorText: "You are running Fluidity on a different device. You should have received a verification code in your email. If not, please contact support.",
                                isBusy: false
                            });
                            return;
                        case "1004":
                            message = "System time mismatch.";
                            open("https://support.apple.com/en-us/HT203413");
                            break;
                        case "1005":
                            message = "This account is temporarily locked due to too many device changes";
                            break;
                        case "1006":
                            message = "This account has been disabled. Please check your email for more information.";
                            break;
                        case "998":
                        case "false.998":
                        case "502":
                            message = "The server is currently experiencing technical difficulties. Please try again later. (code " + code + ")";
                            break;
                    }
                    this.setState({
                        isBusy: false,
                        errorText: message,
                        savedAccounts: []
                    });
                }
            } catch (e) {
                console.error(e);
                debugger;
                this.setState({
                    isBusy: false,
                    errorText: (e as Error).toString()
                });
            }
        }).catch((error: Error) => {
            console.error(error);
            debugger;
            this.setState({
                isBusy: false,
                errorText: error.message
            });
        });
    }
    constructor() {
        super();
        this.setState({
            savedAccounts: [{ account: "username", password: "password" }],
            isBusy: false,
            errorText: "This is an experimental preview version of the next Fluidity experience. If you're not Fluidity Staff, it is not an experimental preview version of the next Fluidity experience, it is a fake, close your eyes!"
        });
    }
}


