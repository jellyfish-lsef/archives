import { editorPromise } from "../editor/monaco/monaco.js";
import { Component, h } from "../lib/preact.js";
import { Toast } from "../toasts/toastManager.js";
const Terminal = (window as any).Terminal as typeof import("../lib/xterm").Terminal;
const FitAddon = (window as any).FitAddon.FitAddon as typeof import("../lib/xterm-addon-fit").FitAddon;
const { ipcRenderer } = require("electron") as typeof import("electron");

console.log(FitAddon);
export const term = new Terminal({
    fontFamily: "\"Cascadia Code\", Menlo, Meslo, monospace",
    cursorBlink: true,
    cursorStyle: "bar",
    cursorWidth: 1
});
export const fit = new FitAddon();
term.loadAddon(fit);

let allowTermInput = false;
term.write("Fluidty " + require("../package.json").version + "\r\n");

let command = "";
let termPrompt = "";
function prompt() {
    term.write("\r" + termPrompt + "> " + command);
}

term.onData((e) => {
    if (!allowTermInput) return;
    switch (e) {
        case "\u0003": // ctrl-c
            term.write("\r\n^C\r\n");
            command = "";
            prompt();
            break;
        case "\u007F": // backspace
            command = command.slice(0, -1);
            term.write("\b \b");
            prompt();
            break;
        case "\r": // enter
            term.write("\r\n");
            ipcRenderer.send("newcomms-send-console", { data: command });
            allowTermInput = false;
            term.options.cursorStyle = "block";
            command = "";
            prompt();
            break;
        default:
            term.write(e);
            command += e;
            prompt();
    }
});
function writeLineToConsole(message:string) {
    term.write("\r\x1b[2K" + message.replace(/@@([A-Za-z_]+?)@@/g, (_:any, g:string) => {
        switch (g.toLowerCase()) {
            case "black":
                return "\x1b[0;30m";
            case "red":
                return "\x1b[0;31m";
            case "green":
                return "\x1b[0;32m";
            case "brown":
            case "yellow":
                return g == "YELLOW" ? "\x1b[1;37m" : "\x1b[0;33m";
            case "blue":
                return "\x1b[0;34m";
            case "magenta":
                return "\x1b[0;35m";
            case "cyan":
                return "\x1b[0;36m";
            case "white":
            case "light_grey":
                return g == "WHITE" ? "\x1b[0;97m" : "\x1b[0;37m";

            case "dark_grey":
            case "bblack":
                return "\x1b[1;30m";
            case "light_red":
            case "bred":
                return "\x1b[1;31m";
            case "light_green":
            case "bgreen":
                return "\x1b[1;32m";
            case "byellow":
                return "\x1b[1;33m";
            case "light_blue":
            case "bblue":
                return "\x1b[1;34m";
            case "light_magenta":
            case "bmagenta":
                return "\x1b[1;35m";
            case "light_cyan":
            case "bcyan":
                return "\x1b[1;36m";
            case "bwhite":
                return "\x1b[1;37m";

            case "ublack":
                return "\x1b[4;30m";
            case "ured":
                return "\x1b[4;31m";
            case "ugreen":
                return "\x1b[4;32m";
            case "ubrown":
            case "uyellow":
                return "\x1b[4;33m";
            case "ublue":
                return "\x1b[4;34m";
            case "umagenta":
                return "\x1b[4;35m";
            case "ucyan":
                return "\x1b[4;36m";
            case "uwhite":
                return "\x1b[4;37m";



            default:
                return "\x1b[0m";
        }
    }) + "");
}
ipcRenderer.on("newcomms-console", (event, pid, message) => {
    writeLineToConsole("[" + pid + "] " + message);
});
ipcRenderer.on("newcomms-input", (event, pid, message) => {
    allowTermInput = true;
    termPrompt = pid.toString();
    term.options.cursorStyle = "bar";
    prompt();
    editorPromise.then((editor) => {
        if (editor.getModel()?.uri.scheme !== "swui-console") {
            (new Toast({
                title: "Console",
                message: "A script has requested console input!",
                icon: "terminal",
                timeout: 5000
            }));
        }
    });
});

export class Console extends Component {
    base?: HTMLElement;
    shouldComponentUpdate() { return false; }
    render() {
        return h("div", { id: "console" });
    }
    componentDidMount() {
        term.open(this.base!);
        fit.fit();
        window.addEventListener("resize", () => fit.fit());
    }
}

