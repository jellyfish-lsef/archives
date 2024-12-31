import { app, BrowserWindow, dialog, ipcMain, Menu, shell, systemPreferences } from "electron";
import * as fs from "fs";
import * as path from "path";
import { CALAMARI_API_LOCATION, JELLYFISH_DATA_DIR } from "./consts";
import { ensureDependency, initInject } from "./injection";
import { initLangServ } from "./languageServer";
import { redirectLogs } from "./logRedirector";

redirectLogs();

if (process.platform !== "darwin") dialog.showErrorBox("oh god", "what are you doing");
app.commandLine.appendSwitch("enable-smooth-scrolling", "true");

if (!fs.existsSync(CALAMARI_API_LOCATION)) fs.mkdirSync(CALAMARI_API_LOCATION);
try { fs.chmodSync(CALAMARI_API_LOCATION, "0777"); } catch (e) {}

if (!fs.existsSync(path.join(JELLYFISH_DATA_DIR))) fs.mkdirSync(path.join(JELLYFISH_DATA_DIR));
if (!fs.existsSync(path.join(JELLYFISH_DATA_DIR, "Scripts"))) fs.mkdirSync(path.join(JELLYFISH_DATA_DIR, "Scripts"));
app.on("ready", async() => {
    if (await ensureDependency() == false) return app.quit();

    console.log("=============");
    console.log();

    const win = new BrowserWindow({
        width: 1200,
        minWidth: 669,
        height: 800,
        minHeight: 150,
        titleBarStyle: "hidden",
        backgroundColor: "#202225",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableBlinkFeatures: "DocumentTransition",
            disableBlinkFeatures: "HardwareMediaKeyMediaSession,MediaSessionService"
        },
        transparent: true,
        // backgroundColor: "#00000000",
        // vibrancy: "sidebar",
        // visualEffectState: "followWindow",
        show: false
    });
    initLangServ(win);
    win.loadFile(path.join(__dirname, "../html/index.html"));
    win.once("ready-to-show", () => {
        setTimeout(() => win.show(), 30);
    });
    win.webContents.setWindowOpenHandler((e) => {
        shell.openExternal(e.url);
        return { action: "deny" };
    });

    ipcMain.on("topmost", (_, arg) => {
        win.setAlwaysOnTop(arg, "floating");
        win.setVisibleOnAllWorkspaces(arg);
        win.setFullScreenable(!arg);
    });
    ipcMain.on("opacity", (_, arg) => {
        win.setOpacity(arg);
    });
    ipcMain.on("log", (_, arg) => console.log(...arg));
    ipcMain.on("logError", (_, arg) => console.error(...arg));

    ipcMain.handle("saveDialog", (_, arg) => {
        console.log(arg);
        return dialog.showSaveDialog(win, {
            title: "Select a location to save the script",
            defaultPath: arg,
            buttonLabel: "Save",
            filters: [{ name: "Lua Script", extensions: ["lua", "txt"] }]
        });
    });
    ipcMain.on("setMenu", (_, arg) => {
        const template = [
            {
                role: "appMenu",
                submenu: [
                    { role: "about" },
                    { type: "separator" },
                    {
                        label: "Preferences",
                        accelerator: "Cmd+,",
                        visible: arg !== -1,
                        click: async() => {
                            win.webContents.send("new-tab", "swui-settings://");
                        }
                    },
                    { type: "separator" },
                    { role: "services" },
                    { type: "separator" },
                    { role: "hide" },
                    { role: "hideOthers" },
                    { role: "unhide" },
                    { type: "separator" },
                    { role: "quit" }

                ]
            },
            {
                label: "File",
                submenu: [
                    {
                        label: "New File",
                        accelerator: "Cmd+N",
                        visible: arg !== -1,
                        click: async() => {
                            win.webContents.send("new-tab");
                        }
                    },
                    {
                        label: "Close " + (typeof arg === "string" ? arg : "Tab"),
                        accelerator: "Cmd+W",
                        visible: arg !== -1,
                        enabled: arg !== 0,
                        click: async() => {
                            win.webContents.send("close-tab");
                        }
                    },
                    {
                        label: "Close " + (typeof arg === "string" ? arg : "Tab"),
                        accelerator: "Cmd+W",
                        visible: arg !== -1,
                        enabled: arg !== 0,
                        click: async() => {
                            win.webContents.send("close-tab");
                        }
                    },
                    { type: "separator" },
                    {
                        label: "Search Fluidity",
                        accelerator: "Cmd+K",
                        visible: arg !== -1,
                        click: async() => {
                            win.webContents.send("focus-search");
                        }
                    }

                ]
            },
            { role: "editMenu" },

            { role: "viewMenu" },
            { role: "windowMenu" },
            {
                role: "help",
                submenu: [
                    {
                        label: "Open a Ticket",
                        click: async() => {
                            await shell.openExternal("https://dashboard.fluidity.com/support");
                        }
                    },
                    {
                        label: "Email Support",
                        click: async() => {
                            await shell.openExternal("mailto://support@fluidity.com");
                        }
                    }
                ]
            }
        ];
        Menu.setApplicationMenu(Menu.buildFromTemplate(template as any));
    });
    ipcMain.handle("req-mic-perms", async(_, arg) => {
        if (arg) await systemPreferences.askForMediaAccess("microphone");
        return systemPreferences.getMediaAccessStatus("microphone");
    });

    initInject(win);
    app.on("window-all-closed", () => {
        app.quit();
    });
});