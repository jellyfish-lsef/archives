import { LoginReqType, LoginStatus, do2FA, doLogin } from "../api/login.js";
import { Component, Fragment, h } from "../lib/preact.js";
import { LoginAvailability } from "./LoginAvailability.js";
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
    constructor() {
        super();
        this.setState({
            savedAccounts: [],
            isBusy: true,
            errorText: "This is an experimental preview version of the next Fluidity experience. "
        });
        ipcRenderer.invoke("auth-get-accounts").then((accounts:Accounts) => {
            this.setState({
                savedAccounts: accounts.reverse(),
                isBusy: false
            });
        });
        (window as any).login = this;
    }


    private HWIDForm(): any {
        return <>
            <div class='loginHWIDReset'>
                <div class='loginForm'>
                    <input type="text" placeholder="Verification code" id="login2fa" />
                    <button class="confirmButton" onClick={() => this.confirm2fa()}>
                        Confirm
                    </button>
                </div>
                <div class='loginLinks'>
                    <a onClick={() => open("https://dashboard.fluidity.developer.com/support")}>
                        Need help?
                    </a>
                </div>
            </div>
        </>;
    }

    private LoginForm() {
        return (<>
            <a href="#" class="loginStatus" onClick={() => this.doGuestLogin()}>
                <div class="loginStatusLight">
                    <i class="material-symbols">person_off</i>
                </div>
                <div class="loginStatusText">
                    <div class="loginStatusName">Continue without an account</div>
                    <div class="loginStatusStatus">Use Fluidity for free!</div>
                </div>
                <div class="loginStatusLink">
                    <i class="material-symbols">chevron_right</i>
                </div>
            </a>


            <div class='loginNewAccount'>
                <div class='loginForm'>
                    <input type="text" placeholder="Username" id="loginUsername" />
                    <input type="password" placeholder="Password" id="loginPassword" />
                    <button class="confirmButton" onClick={() => this.login()}>
                        Log in
                    </button>
                </div>
                <div class='loginLinks'>
                    <a onClick={() => open("https://dashboard.fluidity.developer.com/")}>
                        Reset your password
                    </a>
                    •
                    <a onClick={() => open("https://fluidity.developer.com/m")}>
                        Register a new account
                    </a>
                </div>
            </div>
        </>);
    }

    private SavedAccountsForm() {
        return (
            <div class="loginAccountContainer">
                {
                    this.state.savedAccounts.map((account, i) => (
                        <button
                            class={"loginAccount " + (i == 0 ? "primary" : "")}
                            onClick={() => this.login(account.account, account.password)}
                        >
                            <span class="loginAccountIcon">
                                <img src={getUserImage(account.account) || "./assets/img/profile.png"} />
                            </span>
                            <span class="loginAccountText">
                                <p>{i == 0 ? "Jump straight back in as" : "Continue as"}</p>
                                <b>{account.account}</b>
                            </span>
                        </button>
                    ))
                }

                <button class="loginAccount new" onClick={() => this.setState({ savedAccounts: [], errorText: "" })}>
                    <span class="loginAccountIcon">
                        <i class="material-symbols">add_circle</i>
                    </span>
                    <span class="loginAccountText">
                        <span>Add a new account</span>
                    </span>
                </button>
            </div>
        );
    }



    render() {
        const output = [];
        if (this.state.needsHWIDVerification) {
            output.push(
                this.HWIDForm()
            );
        } else if (this.state.savedAccounts.length > 0) {
            output.push(this.SavedAccountsForm());
        } else {
            output.push(this.LoginForm());
        }

        return (<>
            <div id="loginBackground"></div>
            <div id="loginBar">
                <div id="loginBarHeader">
                    <img src="./assets/img/logo.svg" alt="Fluidity Logo" height="150"/>
                </div>
                <div id="loginBarBody">
                    <div hidden={!this.state.isBusy}>
                        <div class='errorText loading'><i class='material-symbols'>refresh</i> <p>{this.state.errorText || "Please wait..."}</p></div>
                    </div>
                    <div hidden={this.state.isBusy}>
                        <LoginAvailability />
                        <div hidden={!this.state.errorText} class='errorText'><i class='material-symbols'>error</i> <p>{this.state.errorText}</p></div>
                        {
                            this.state.needsHWIDVerification ? this.HWIDForm() :
                                this.state.savedAccounts.length > 0 ? this.SavedAccountsForm() :
                                    this.LoginForm()
                        }
                    </div>

                </div>
                <div id="loginBarFooter">
                    <img src="./assets/img/logo.svg" alt="Fluidity Logo" height="48"/>
                    <p>
                        Revolutionising script execution since 2017.<br />

                        <a onClick={() => open(this.state.needsHWIDVerification ? "https://dashboard.fluidity.developer.com/support" : "mailto:admin@fluidity.developer.com")}>
                            <i class="material-symbols">email</i> We're here to help!
                        </a>
                        •
                        v{require("../package.json").version}
                    </p>
                </div>
            </div>
        </>);
    }


    async confirm2fa() {
        this.setState({ isBusy: true });
        const code = (document.getElementById("login2fa") as HTMLInputElement).value;

        try {
            await do2FA(code);
            this.setState({ isBusy: false, needsHWIDVerification: false, errorText: "Your Fluidity account has been registered for use on this computer, you may now login!" });
        } catch (e) {
            this.setState({ isBusy: false, needsHWIDVerification: true, errorText: (e as any).message });
        }
    }
    async login(username?: string, password?: string) {
        if (!username) {
            username = (document.getElementById("loginUsername") as HTMLInputElement).value;
        }
        if (!password) {
            password = (document.getElementById("loginPassword") as HTMLInputElement).value;
        }
        this.setState({
            isBusy: true,
            errorText: "Logging in as " + username + "..."
        });
        if (!username || !password) {
            try {
                const accounts: Accounts = await ipcRenderer.invoke("auth-get-accounts");
                if (accounts.length) {
                    this.setState({
                        savedAccounts: accounts,
                        errorText: "",
                        isBusy: false
                    });
                } else {
                    this.setState({
                        isBusy: false,
                        errorText: "Please enter a username and password."
                    });
                }
            } catch (e) {
                this.setState({
                    isBusy: false,
                    errorText: "Please enter a username and password."
                });
            }
        } else {
            try {
                const loginAttempt = await doLogin(LoginReqType.NORMAL, username, password);
                switch (loginAttempt.status) {
                    case LoginStatus.SUCCESS:
                        return this.props.onLogin();
                    case LoginStatus.HWID_RESET:
                        return this.setState({
                            savedAccounts: [{ account: username, password }],
                            needsHWIDVerification: true,
                            errorText: loginAttempt.message,
                            isBusy: false
                        });
                }
            } catch (e) {
                this.setState({
                    isBusy: false,
                    errorText: (e as any).message
                });
            }
        }
    }

    doGuestLogin() {
        this.setState({
            isBusy: true,
            errorText: "Launching Fluidity..."
        });
        setTimeout(async() => {
            try {
                const loginAttempt = await doLogin(LoginReqType.FREE);
                if (loginAttempt.status == LoginStatus.SUCCESS) {
                    return this.props.onLogin();
                } else {
                    throw new Error(loginAttempt.message);
                }
            } catch (e) {
                this.setState({
                    isBusy: false,
                    errorText: (e as any).message
                });
            }
        });
    }
}


