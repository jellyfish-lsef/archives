import htm from "../lib/htm.js";
import { Component, h } from "../lib/preact.js";
import settings from "./settingsManager.js";
const html = htm.bind(h);
const { shell, ipcRenderer } = require("electron");

export class SettingsPage extends Component<{}, {
    microphoneStatus: "not-determined" | "granted" | "denied" | "restricted" | "unknown";
}> {
    render() {
        return html`
<div class="content" id="aboutPage">
    <section id="aboutPageHeader">
        <img src="assets/img/logo.svg" height="96" />
        <div>
            <h1 id="aboutName">Fluidity for macOS</h1>
            <h3 id="aboutCopyright">Version ${require("../package.json").version} - © 2022 Fluidity</h3>
        </div>
    </section>

    <section id="aboutPageLinks">
        <a href="javascript:void" onclick=${() => this.openDashboard("https://dashboard.fluidity.com/settings")}>
            <i class="material-symbols">account_circle</i>
            Manage Account
        </a>
        •
        <a href="https://dev.fluidity.com/docs/macOS/getting/started/welcome" target="_blank">
            <i class="material-symbols">menu_book</i>
            Documentation
        </a>
        <br />
        <a href="javascript:void" onclick=${() => this.openDashboard("https://dashboard.fluidity.com/support")}>
            <i class="material-symbols">support_agent</i>
            Support
        </a>
        •
        <a href="https://github.com/jellyfish-lsef/swm-bugtracker/issues" target="_blank">
            <i class="material-symbols">bug_report</i>
            Report Bugs & Feature Requests
        </a>
        •
        <a href="https://discord.gg/scripting" target="_blank">
            <i class="material-symbols">sms</i>
            Discord
        </a>
    </section>

    <section id="aboutPageOptions">
        <div class="aboutPageOption">
            <div class="aboutPageOptionBar">
                <div class="aboutPageOptionTitle">
                    <i class="material-symbols">dynamic_form</i> Enhanced language features
                </div>
                <div class="aboutPageOptionControl">
                    <input type="checkbox" id="aboutPageOptionControl" checked=${settings.lspEnabled} onchange=${(e: Event) => ipcRenderer.send("setLspEnabled", settings.lspEnabled = (e.target as HTMLInputElement).checked)} />
                </div>
            </div>
            <div class="aboutPageOptionDescription">
                Enables the <a href="https://github.com/NightrainsRbx/RobloxLsp" target="_blank">RobloxLSP</a> language server, which provides enhanced language features such as enhanced autocomplete, diagnostics, and more.
                <br/>
                Enabling this may increase memory & CPU usage, and therefore is not recommended for those who are not writing scripts inside Fluidity.
                <br/>
                <b><i class="material-symbols">info</i> Toggle this will require Fluidity to restart.</b>
            </div>
        </div>
        <div class="aboutPageOption">
            <div class="aboutPageOptionBar">
                <div class="aboutPageOptionTitle">
                    <i class="material-symbols">view_sidebar</i> Auto-hide sidebar
                </div>
                <div class="aboutPageOptionControl">
                    <input type="checkbox" id="aboutPageOptionControl" checked=${settings.autoHideSidebar} onchange=${(e: Event) => settings.autoHideSidebar = (e.target as HTMLInputElement).checked} />
                </div>
            </div>
            <div class="aboutPageOptionDescription">
                Automatically hide the sidebar when the mouse is not over it.
            </div>
        </div>
        <div class="aboutPageOption">
            <div class="aboutPageOptionBar">
                <div class="aboutPageOptionTitle">
                    <i class="material-symbols">open_in_browser</i> Always topmost
                </div>
                <div class="aboutPageOptionControl">
                    <input type="checkbox" id="aboutPageOptionControl" checked=${settings.topmost} onchange=${(e: Event) => settings.topmost = (e.target as HTMLInputElement).checked} />
                </div>
            </div>
            <div class="aboutPageOptionDescription">
                Fluidity will appear on top of all other windows.
            </div>
        </div>
        <div class="aboutPageOption">
            <div class="aboutPageOptionBar">
                <div class="aboutPageOptionTitle">
                    <i class="material-symbols">opacity</i> Opacity
                </div>
                <div class="aboutPageOptionControl">
                    <input type="range" id="aboutPageOptionControl" value=${settings.opacity}  max="1" min="0.2" step="0.01" onchange=${(e: Event) => settings.opacity = parseFloat((e.target as HTMLInputElement).value)} />
                </div>
            </div>
            <div class="aboutPageOptionDescription">
                Makes the Fluidity window transparent. Helpful with the always topmost option.
            </div>
        </div>
        <div class="aboutPageOption">
            <div class="aboutPageOptionBar">
                <div class="aboutPageOptionTitle">
                    <i class="material-symbols">60fps_select</i> Unlock FPS
                </div>
                <div class="aboutPageOptionControl">
                    <input type="checkbox" id="aboutPageOptionControl" checked=${settings.fpsUnlock} onchange=${(e: Event) => settings.fpsUnlock = (e.target as HTMLInputElement).checked} />
                </div>
            </div>
            <div class="aboutPageOptionDescription">
                By default, the frame rate will be locked to 60fps, if you have a high refresh rate monitor, you might want to unlock it.
                <br/>
                <b><i class="material-symbols">warning</i> This may slow down your Mac, and result in less battery life.</b>
            </div>
        </div>
        <div class="aboutPageOption">
            <div class="aboutPageOptionBar">
                <div class="aboutPageOptionTitle">
                    <i class="material-symbols">hotel</i> Disable idle kick
                </div>
                <div class="aboutPageOptionControl">
                    <input type="checkbox" id="aboutPageOptionControl" checked=${settings.antiAfk} onchange=${(e: Event) => settings.antiAfk = (e.target as HTMLInputElement).checked} />
                </div>
            </div>
            <div class="aboutPageOptionDescription">
                Prevents you from being kicked from the server if you are idle for more than 20 minutes.
            </div>
        </div>
        <div class="aboutPageOption">
            <div class="aboutPageOptionBar">
                <div class="aboutPageOptionTitle">
                    <i class="material-symbols">timer</i> Injection delay 
                </div>
                <div class="aboutPageOptionControl">
                    <select onchange=${(e: Event) => settings.injectionDelay = (e.target as HTMLInputElement).value} value=${settings.injectionDelay} name="injDelay" id="injDelay">
                            <option default="" value="0">No delay</option>
                            <option value="1">1 second</option>
                            <option value="2">2 seconds</option>
                            <option value="3">3 seconds</option>
                            <option value="4">4 seconds (default)</option>
                            <option value="5">5 seconds</option>
                            <option value="6">6 seconds</option>
                            <option value="7">7 seconds</option>
                            <option value="8">8 seconds</option>
                            <option value="9">9 seconds</option>
                            <option value="10">10 seconds</option>                    
                            <option value="11">11 seconds</option>
                            <option value="12">12 seconds</option>
                            <option value="13">13 seconds</option>
                            <option value="14">14 seconds</option>
                            <option value="15">15 seconds</option>
                    </select>
                </div>
            </div>
            <div class="aboutPageOptionDescription">
                Adds a delay to the injection process, which can prevent crashes, especially on games that immediately teleport.
            </div>
        </div>


        <div class="aboutPageOption">
            <div class="aboutPageOptionBar">
                <div class="aboutPageOptionTitle">
                    <i class="material-symbols">auto_awesome</i> Auto execute
                </div>
                <div class="aboutPageOptionControl">
                    <a href="#" onclick=${() => shell.openPath("/Users/Shared/Fluidity/AutoExecute")}>
                        Open Folder  <i class="material-symbols">open_in_new</i>
                    </a>
                </div>
            </div>
            <div class="aboutPageOptionDescription">
                Scripts placed in this folder will automatically be executed when Fluidity is injected.
            </div>
        </div>


        <div class="aboutPageOption">
            <div class="aboutPageOptionBar">
                <div class="aboutPageOptionTitle">
                    <i class="material-symbols">receipt_long</i> View logs
                </div>
                <div class="aboutPageOptionControl">
                    <a href="#" onclick=${() => shell.openPath(require("path").join(require("os").homedir(), "Library", "Logs", "Fluidity.log"))}>
                        Open <i class="material-symbols">open_in_new</i>
                    </a>
                </div>
            </div>
            <div class="aboutPageOptionDescription">
                View debug logs of Fluidity, logs from the game & and any scripts may also be saved here.
            </div>
        </div>
        <div class="aboutPageOption" style="display: ${this.state.microphoneStatus == "granted" ? "none" : "block"}">
            <div class="aboutPageOptionBar">
                <div class="aboutPageOptionTitle">
                    <i class="material-symbols">mic</i> Request Microphone Permissions
                </div>
                <div class="aboutPageOptionControl">
                    ${this.state.microphoneStatus == "denied" ?
        html`<a href="#" onclick=${async() => shell.openPath("/System/Library/PreferencePanes/Security.prefPane")}>
                        Open System Preferences <i class="material-symbols">settings_applications</i>
                    </a>` :
        html`
                <a href="#" onclick=${async() => this.setState({ microphoneStatus: await ipcRenderer.invoke("req-mic-perms", true) })}>
                        Request Permission <i class="material-symbols">task_alt</i>
                    </a>`}
                </div>
            </div>
            <div class="aboutPageOptionDescription">
            If you are experiencing crashes while voice chat is enabled, you may need to request microphone permissions for Fluidity.
            <br/>
            <b><i class="material-symbols">privacy_tip</i> This permission is only asked so that it can be used for the game's voice chat, Fluidity respects your privacy and will NEVER use it for any other reasons.</b>
            </div>
        </div>

    </section>
</div>
        `;
    }
    componentWillMount() {
        ipcRenderer.invoke("req-mic-perms", false).then((microphoneStatus) => {
            this.setState({ microphoneStatus });
        });
    }
    openDashboard(url: string) {
        // todo: embedded dashboard
        shell.openExternal(url);
    }
}
