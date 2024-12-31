import child_process from "child_process";
import { BrowserWindow, clipboard, dialog, ipcMain } from "electron";
import fs from "fs";
import fetch from "node-fetch";
import { CALAMARI_API_LOCATION } from "./consts";
import { NewCommsConnection, NewCommsMessageType, newComms } from "./newcomms";

const sleep = (ms: number) => new Promise((a) => setTimeout(a, ms));

async function getProcessess() {
    const proc = child_process.spawn("ps", ["-exo", "pid,args"]);
    let stdout = "";
    proc.stdout.on("data", (data) => { stdout += data.toString(); });
    await (new Promise((a, r) => {
        proc.on("close", a);
        proc.on("error", r);
    }));
    return stdout
        // split each individual process
        .split("\n")
        // filter for RobloxPlayer only
        .filter((e) => e.includes("RobloxPlayer") && !e.includes("--crashHandler") && (e.includes("-ticket") || e.endsWith("RobloxPlayer")))
        // split pid & arguments
        .map((e) => e.split(" "))
        // sometimes it has padding, this removes the first element until its a number
        .map((l) => {
            while (isNaN(parseInt(l[0]))) {
                l.shift();
            }
            return l;
        })
        // return as js object
        .map((e) => ({ pid: parseInt(e.shift()!), command: e.shift(), arguments: e }))
        // filter already injected processes
        .filter((e) => !injectionStatus.processes.has(e.pid));
}

function downloadFile(url: string, pat: string) {
    console.log("downloading", url, "to", pat);
    return new Promise(async(a, r) => {
        const dest = fs.createWriteStream(pat);
        dest.on("error", r);
        const res = await fetch(url);
        res.body.pipe(dest);
        try { fs.chmodSync(pat, "777"); } catch (e) { }
        res.body.on("error", r);
        res.body.on("end", a);
    });
}
function writable(pat: string) {
    return new Promise((a) => {
        fs.access(pat, fs.constants.W_OK, (err) => {
            a(!err);
        });
    });
}




interface InjectionStatus {
    globalStatus: string | null;
    processes: Map<number, {
        status: string | null,

        universeId?: string;
        placeId?: string;
        userId?: string;
        userName?: string;
        userDisplayName?: string;

        connection?: NewCommsConnection
    }>;
}
export const injectionStatus: InjectionStatus = {
    globalStatus: null,
    processes: new Map()
};
let hasUpdated = false;

let win: BrowserWindow;

function setStatus(status: string | null) {
    if (status) console.log(status);
    if (!win) return;
    injectionStatus.globalStatus = status;
    win.webContents.send("injection-status", JSON.stringify({
        globalStatus: injectionStatus.globalStatus,
        processes: Object.fromEntries(injectionStatus.processes.entries())
    }));
}
function setProcessStatus(pid: number, status: string | null) {
    if (status) console.log(pid, status);
    if (!injectionStatus.processes.has(pid)) {
        injectionStatus.processes.set(pid, { status });
    } else {
        injectionStatus.processes.get(pid)!.status = status;
    }
    setStatus(injectionStatus.globalStatus);
}
function updateInjectionDataFromLog(log: string, searchingFor: string, pid:number, target: string) {
    const idx = log.indexOf(searchingFor + "%22%3a");
    if (idx === -1) return false;
    console.log("found", searchingFor);
    const nidx = log.indexOf(searchingFor + "%22%3a%22");
    const targ = (injectionStatus.processes.get(pid)! as any);
    if (targ[target]) return false;
    targ[target] = "";
    for (let i = idx + searchingFor.length + (nidx == -1 ? 6 : 9); i < log.length; i++) {
        const charat = log.charAt(i);
        console.log(charat);
        if (charat == "%") break;
        targ[target] += charat;
    }
    return true;
}

let authToken = "";

newComms.on("connection", (conn: NewCommsConnection) => {
    conn.on("hello", () => {
        setProcessStatus(conn.pid!, "Waiting login.");
        while (!authToken.length) {
            sleep(10);
        }
        setProcessStatus(conn.pid!, null);
        conn.send(NewCommsMessageType.SEND_AUTH, authToken);
        injectionStatus.processes.get(conn.pid!)!.connection = conn;
        win.webContents.send("injected", conn.pid!);
        if (fpsUnlocked) conn.send(NewCommsMessageType.SEND_SCRIPT, "setfpscap(9999)");
        if (antiAfk) conn.send(NewCommsMessageType.SEND_SCRIPT, "for i,v in pairs(getconnections(game.Players.LocalPlayer.Idled)) do v.Disable(v) end");
    });
    conn.on("console", (data) => {
        win.webContents.send("newcomms-console", conn.pid!, data);
    });

    conn.on("input", (data) => {
        win.webContents.send("newcomms-input", conn.pid!, data);
    });
    conn.on("disconnected", () => {
        injectionStatus.processes.delete(conn.pid!);
        conn.removeAllListeners();
        setStatus(injectionStatus.globalStatus);
    });
});

export async function ensureChilkat() {
    setStatus("Downloading dependencies");
    if (!fs.existsSync("/usr/local/lib/libchilkat_x86_64.dylib")) {
        console.log("Downloading chilkat");
        while (true) {
            try {
                await downloadFile("https://cdn.fluidity.developer.com/mac/libchilkat_x86_64.1.dylib", "/usr/local/lib/libchilkat_x86_64.dylib");
                console.log("Downloaded chilkat");
                break;
            } catch (e) {
                console.log(e);
                const opts = {
                    type: "warning",
                    buttons: ["Open & Copy", "Done", "Cancel"],
                    title: "Dependency missing",
                    message: `Fluidity is missing a crucial dependency, no worries though! We'll download it for you now. However, you'll need to perform a few simple steps before we can do so
    1. Select 'Open & Copy' on this dialog
    2. The Terminal will open, and then you will need to paste the command that was copied to your clipboard and press Enter/Return.
    3. Enter your Mac's login password if prompted (you will not be able to see it being entered for security reasons)
    4. You can now close Terminal, and click 'Done' to continue.\n\nIf this persists, tell this to the support person: ${e}`
                };
                let result;
                if (win) result = await dialog.showMessageBox(win, opts);
                else result = await dialog.showMessageBox(opts);
                switch (result.response) {
                    case 0:
                        child_process.spawnSync("/usr/bin/open", ["-a", "Terminal"]);
                        clipboard.writeText("sudo mkdir /usr/local/lib;sudo chmod 777 /usr/local/lib;exit");
                        break;
                    case 1:
                        break;
                    case 2:
                        return false;
                }
            }
        }
    }
    return true;
}


async function doInject(requestCustomDylib: boolean) {
    console.log("Injecting!");
    try {
        if (injectionStatus.globalStatus) return;
        setStatus("Injecting");
        if (!fs.existsSync(CALAMARI_API_LOCATION)) {
            fs.mkdirSync(CALAMARI_API_LOCATION);
        }

        // if (await ensureChilkat() == false) return;
        if (1) hasUpdated = true;

        let dylibLocation = "";// path.join(CALAMARI_API_LOCATION, "libFluidity.dylib");
        setStatus("Updating");
        if (requestCustomDylib) {
            const ret = await dialog.showOpenDialog(win, {
                title: "Select a custom dylib",
                message: "Shift was held while injecting, so you can select a custom dylib to inject. If you didn't mean to do this, just select 'libFluidity.dylib' or close this window.",
                defaultPath: dylibLocation,
                buttonLabel: "Inject",
                properties: ["openFile"]
            });
            if (!ret.filePaths.length) {
                requestCustomDylib = false;
            } else {
                dylibLocation = ret.filePaths[0];
            }
        } else if (!hasUpdated || !fs.existsSync(dylibLocation)) {
            // await downloadFile(DYLIB_UPDATE, dylibLocation);
            hasUpdated = true;
        }
        if (0) {
            setStatus("Patching");
            try {
                const decodesign = child_process.spawnSync("/usr/bin/codesign", ["--remove-signature", "/Applications/Roblox.app/Contents/MacOS/RobloxPlayer"]);
                console.log(decodesign.stderr.toString(), decodesign.stdout.toString(), decodesign.status);
            } catch (e) { console.error(e); }
            try {
                const decodesign = child_process.spawnSync("/usr/bin/codesign", ["--remove-signature", "/Applications/Roblox.app/Contents/MacOS/Roblox.app/Contents/MacOS/Roblox"]);
                console.log(decodesign.stderr.toString(), decodesign.stdout.toString(), decodesign.status);
            } catch (e) { console.error(e); }
        }


        setStatus("Searching");
        let processes = await getProcessess();
        console.log(processes);
        if (processes.length) {
            setStatus("Not supported");
            await dialog.showMessageBox(win, {
                type: "warning",
                buttons: ["OK"],
                title: "Not supported",
                message: "Post-inject is not currently supported. Please close the game, presss inject, and THEN open Roblox."
            });

            return setStatus(null);
        } else {
            setStatus("Open Roblox!");
            while (!processes.length) {
                await sleep(1000);
                processes = await getProcessess();
            }
            for (const proc of processes) {
                setStatus("Closing");
                try {
                    process.kill(proc.pid);
                } catch (e) {
                    console.error(e);
                    setStatus("Failed");
                    dialog.showMessageBox(win, {
                        type: "error",
                        buttons: ["OK"],
                        title: "Couldn't quit Roblox",
                        message: (e as any).toString()
                    });
                    return setTimeout(() => setStatus(null));
                }
                const args = proc.arguments;
                if (0) {
                    setStatus("Patching");
                    try {
                        const decodesign = child_process.spawnSync("/usr/bin/codesign", ["--remove-signature", proc.command!]);
                        console.log(decodesign.stderr.toString(), decodesign.stdout.toString(), decodesign.status);
                    } catch (e) { console.error(e); }
                }
                setStatus("Relaunching");
                const nproc = child_process.spawn(proc.command!, args, {
                    detached: true,
                    env: {
                        DYLD_INSERT_LIBRARIES: dylibLocation
                    }
                });
                nproc.unref();
                nproc.stdout.on("data", (data) => {
                    const string = data.toString();
                    console.log("[" + nproc.pid + "] " + string);
                    let shouldUpdate = updateInjectionDataFromLog(string, "UniverseId", nproc.pid!, "universeId");
                    shouldUpdate = updateInjectionDataFromLog(string, "PlaceId", nproc.pid!, "placeId") || shouldUpdate;
                    shouldUpdate = updateInjectionDataFromLog(string, "UserId", nproc.pid!, "userId") || shouldUpdate;
                    shouldUpdate = updateInjectionDataFromLog(string, "UserName", nproc.pid!, "userName") || shouldUpdate;
                    shouldUpdate = updateInjectionDataFromLog(string, "DisplayName", nproc.pid!, "userDisplayName") || shouldUpdate;
                    if (shouldUpdate) setStatus(injectionStatus.globalStatus);
                });
                nproc.stderr.on("data", (data) => {
                    console.error("[!" + nproc.pid + "] " + data.toString());
                });

                setStatus(null);
                setProcessStatus(nproc.pid!, "Loading");

                if (1) {
                    newComms.emit("connection", {
                        pid: nproc.pid!,
                        on: (evt: string, nccb: (...rgs: any[]) => void) => {
                            if (evt == "hello") nccb();
                        },
                        send: (type: NewCommsMessageType, data: string) => {
                            console.log("[ncomm] Outgoing ", type + data + "\0");
                        }
                    });
                }
                nproc.on("exit", () => {
                    injectionStatus.processes.delete(nproc.pid!);
                    setStatus(injectionStatus.globalStatus);
                });
            }
        }
    } catch (e) {
        console.error(e);
        setStatus("Failed");
        dialog.showMessageBox(win, {
            type: "error",
            buttons: ["OK"],
            title: "Injection failure",
            message: (e as any).toString()
        });
        return setTimeout(() => setStatus(null));
    }
}

export function initInject(win_: BrowserWindow) {
    newComms.init();
    ipcMain.handle("inject", async(_, requestCustomDylib: boolean) => doInject(requestCustomDylib));
    ipcMain.handle("getStatus", async() => setStatus(injectionStatus.globalStatus));
    ipcMain.on("authenticated", (_, token: string) => authToken = token);
    ipcMain.on("newcomms-run-script", (_, message: {pid?: number, script: string}) => {
        console.log(message);
        if (message.pid) {
            const proc = injectionStatus.processes.get(message.pid);
            proc?.connection?.send(NewCommsMessageType.SEND_SCRIPT, message.script);
        } else {
            injectionStatus.processes.forEach((proc) => {
                proc.connection?.send(NewCommsMessageType.SEND_SCRIPT, message.script);
            });
        }
    });
    ipcMain.on("newcomms-send-console", (_, message: {pid?: number, data: string}) => {
        console.log(message);
        if (message.pid) {
            const proc = injectionStatus.processes.get(message.pid);
            proc?.connection?.send(NewCommsMessageType.SEND_CONSOLE_INPUT, message.data);
        } else {
            injectionStatus.processes.forEach((proc) => {
                proc.connection?.send(NewCommsMessageType.SEND_CONSOLE_INPUT, message.data);
            });
        }
    });
    win = win_;
}

let fpsUnlocked = false;
ipcMain.on("fpsUnlock", (_, arg) => {
    fpsUnlocked = arg;
    injectionStatus.processes.forEach((proc) => {
        proc.connection?.send(NewCommsMessageType.SEND_SCRIPT, `setfpscap(${arg ? 9999 : 60})`);
    });
});

let antiAfk = false;
ipcMain.on("antiAfk", (_, arg) => {
    antiAfk = arg;
    injectionStatus.processes.forEach((proc) => {
        proc.connection?.send(NewCommsMessageType.SEND_SCRIPT, `while not game:IsLoaded() then wait() end for i,v in pairs(getconnections(game.Players.LocalPlayer.Idled)) do v.${arg ? "Disable" : "Enable"}(v) end`);
    });
});