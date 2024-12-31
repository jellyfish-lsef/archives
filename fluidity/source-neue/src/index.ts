import { app, BrowserWindow, dialog, ipcMain, Menu, nativeTheme, shell, systemPreferences } from "electron";
import * as fs from "fs";
import * as path from "path";
import { fdtyauth2 } from "./authentication";
import { CALAMARI_API_LOCATION, JELLYFISH_DATA_DIR } from "./consts";
import { initInject } from "./injection";
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
    // if (await ensureChilkat() == false) return app.quit();

    try { fdtyauth2([]); } catch (e) {}
    console.log("=============");
    console.log();
    nativeTheme.themeSource = "dark";
    const initWithVibrancy = fs.existsSync(path.join(JELLYFISH_DATA_DIR, ".fdty_vibrant_disable"));

    const win = new BrowserWindow({
        width: 1200,
        minWidth: 669,
        height: 800,
        minHeight: 150,
        titleBarStyle: "hidden",
        trafficLightPosition: { x: 14, y: 12 },
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableBlinkFeatures: "DocumentTransition",
            disableBlinkFeatures: "HardwareMediaKeyMediaSession,MediaSessionService"
        },
        transparent: !initWithVibrancy,
        // backgroundColor: "#00000000",
        vibrancy: "sidebar",
        visualEffectState: initWithVibrancy ? "inactive" : "followWindow",
        // backgroundMaterial: "acrylic",
        show: false


    });
    initLangServ(win);
    win.loadFile(path.join(__dirname, "../html/index.html"));
    win.webContents.openDevTools();
    win.once("ready-to-show", () => {
        win.setVibrancy("sidebar");
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
        if (arg == 1 && win.getOpacity() == 1) return;
        win.setOpacity(arg);
    });
    ipcMain.on("vibrant", (_, arg) => {
        const vibrancyDisabled = fs.existsSync(path.join(JELLYFISH_DATA_DIR, ".fdty_vibrant_disable"));
        if (vibrancyDisabled && arg) fs.unlinkSync(path.join(JELLYFISH_DATA_DIR, ".fdty_vibrant_disable"));
        else if (!vibrancyDisabled && !arg) fs.writeFileSync(path.join(JELLYFISH_DATA_DIR, ".fdty_vibrant_disable"), "");
        if (arg == initWithVibrancy) app.quit();
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
                        label: "Save " + (typeof arg === "string" ? arg : "Tab"),
                        accelerator: "Cmd+S",
                        visible: arg !== -1,
                        enabled: arg !== 0,
                        click: async() => {
                            win.webContents.send("save-tab", false);
                        }
                    },
                    {
                        label: "Save " + (typeof arg === "string" ? arg : "Tab") + " As",
                        accelerator: "Cmd+Shift+S",
                        visible: arg !== -1,
                        enabled: arg !== 0,
                        click: async() => {
                            win.webContents.send("save-tab", true);
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
                            await shell.openExternal("https://dashboard.fluidity.developer.com/support");
                        }
                    },
                    {
                        label: "Email Support",
                        click: async() => {
                            await shell.openExternal("mailto://support@fluidity.developer.com");
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
    ipcMain.handle("req-cam-perms", async(_, arg) => {
        if (arg) await systemPreferences.askForMediaAccess("camera");
        return systemPreferences.getMediaAccessStatus("camera");
    });

    initInject(win);
    app.on("window-all-closed", () => {
        app.quit();
    });
});