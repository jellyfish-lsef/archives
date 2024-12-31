
const { app, BrowserWindow, dialog, ipcMain, shell } = require("electron");
app.commandLine.appendSwitch("disable-features", "HardwareMediaKeyHandling,MediaSessionService");
app.commandLine.appendSwitch("enable-smooth-scrolling", true);
const fs = require("fs");
const path = require("path");
const os = require("os");
const keytar = require("keytar");
const ChildProcess = require("child_process");
const getProcesses = require("./getProcesses.js");
const {
    CALAMARI_API_LOCATION, JELLYFISH_DATA_DIR, IPC_LOCATION_NOTIFICATION, KEYCHAIN_SERVICE
} = require("./consts");

if (!fs.existsSync(CALAMARI_API_LOCATION)) {
    fs.mkdirSync(CALAMARI_API_LOCATION);
}
try { fs.chmodSync(CALAMARI_API_LOCATION, "777"); } catch (e) {}

global.JELLYFISH_DATA_DIR = JELLYFISH_DATA_DIR;
if (!fs.existsSync(JELLYFISH_DATA_DIR)) {
    fs.mkdirSync(JELLYFISH_DATA_DIR);
}
if (!fs.existsSync(path.join(JELLYFISH_DATA_DIR, "Scripts"))) {
    fs.mkdirSync(path.join(JELLYFISH_DATA_DIR, "Scripts"));
}

if (fs.existsSync(IPC_LOCATION_NOTIFICATION)) {
    fs.unlinkSync(IPC_LOCATION_NOTIFICATION);
}

let lws = fs.createWriteStream(path.join(JELLYFISH_DATA_DIR, "log.diag"));
let lwc;
function logRedirector(target, color) {
    let write = target.write;
    return function(string) {
        try {
            let pfx = "\x1B[3" + color + "m[" + new Date() + "]    ";
            let out = pfx + string.toString().trimEnd().replace(/\n/g, "\n" + pfx)
                .replace(/\x1B\[39m/g, "\x1B[3" + color + "m") + "\n";
            lws.cork();
            lws.write(out);
            lws.uncork();
            write.apply(target, [out]);
            if (lwc) lwc.send("logwrite", out);
        } catch (e) {}
    };
}

process.stdout.write = logRedirector(process.stdout, 9);
process.stderr.write = logRedirector(process.stderr, 1);
process.on("uncaughtException", (e) => {
    console.error("Unhandled exception!!!!!", e);
});
process.on("unhandledRejection", (e) => {
    console.error("Unhandled rejection!!!!!", e);
});

global.consoleerror = console.error;
global.consolelog = console.trace;

console.log("Jellyfish " + require("./package.json").version + " running on " + os.platform() + " v" + os.release());
console.log("CPU     : " + (os.cpus()[0] || { model: "unknown" }).model);
console.log("Hostname: " + os.hostname());
console.log("Home    : " + os.homedir());


app.on("ready", async() => {
    console.log("================");
    console.log("");

    let win = new BrowserWindow({
        width: 980,
        minWidth: 580,
        height: 650,
        minHeight: 340,
        titleBarStyle: "hidden",
        backgroundColor: "#222222",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        show: true
    });
    // win.loadFile("html")

    win.loadFile(path.join(__dirname, "html", "index.html"));
    // win.loadURL("http://localhost:9999")
    win.webContents.on("new-window", (e, url) => {
        e.preventDefault();
        shell.openExternal(url);
    });
    win.on("ready-to-show", (e, url) => {
        setTimeout(() => { win.show(); }, 500);
    });

    ipcMain.handle("get-processes", getProcesses);


    ipcMain.on("show-log", (evt, arg) => {
        let logw = new BrowserWindow({
            width: 980,
            height: 650,
            backgroundColor: "#202225",
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true
            }
        });
        logw.loadFile(path.join(__dirname, "html", "log.html"));
        lwc = logw.webContents;
    });
    ipcMain.on("set-ontop", (evt, arg) => {
        console.trace(arg);
        win.setAlwaysOnTop(arg, "floating");
        win.setVisibleOnAllWorkspaces(arg);
        win.setFullScreenable(!arg);
    });
    ipcMain.handle("save-script", (evt, arg, loc) => {
        console.log(evt, arg, loc);
        var loc = dialog.showSaveDialogSync(win, {
            title: "Save Current Script",
            defaultPath: loc ? global.AUTOINJECT_DIRECTORY : path.join(JELLYFISH_DATA_DIR, "Scripts"),
            buttonLabel: "Save",
            message: "Choose where you want to save the current script in the editor.",
            filters: [{ extensions: ["lua", "txt"] }]
        });
        if (!loc) return evt.returnValue = false;
        if (!loc.endsWith(".lua") && !loc.endsWith(".txt")) {
            loc += ".lua";
        }
        return evt.returnValue = loc;
    });
    ipcMain.on("save-compressed-script", (evt, arg) => {
        let loc = dialog.showSaveDialogSync(win, {
            title: "Would you like to accept '" + arg[1] + "' from '" + arg[0] + "'?",
            defaultPath: path.join(JELLYFISH_DATA_DIR, "Scripts", arg[1]),
            buttonLabel: "Save",
            message: "Would you like to accept '" + arg[1] + "' from '" + arg[0] + "'?",
            filters: [{ extensions: ["lua", "txt"] }]
        });
        if (!loc) return evt.returnValue = false;
        if (!loc.endsWith(".lua") && !loc.endsWith(".txt")) {
            loc += ".lua";
        }
        let stream = fs.createWriteStream(loc);
        let b = Buffer.from(arg[2], "base64");
        b = b.subarray(4, b.length - 4);
        console.trace(b.toString("base64"));
        let gunzip = require("zlib").createGunzip();
        gunzip.write(b);
        gunzip.pipe(stream);
        evt.returnValue = true;
    });
    ipcMain.on("log", (evt, ...args) => {
        console.log(...args);
    });
    ipcMain.on("logError", (evt, ...args) => {
        console.error(...args);
    });
});
