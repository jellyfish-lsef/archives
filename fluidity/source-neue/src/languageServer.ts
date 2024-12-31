import { execSync, spawn } from "child_process";
import { BrowserWindow, ipcMain } from "electron";
import { dialog } from "electron/main";
import * as fs from "fs";
import fetch from "node-fetch";
import { InitializeRequest } from "vscode-languageserver";
import * as rpc from "vscode-ws-jsonrpc";
import { createConnection, createServerProcess, forward } from "vscode-ws-jsonrpc/lib/server";
let languageServerReady = false;


class ElectronIPCIWebSocket {
    win?: BrowserWindow;
    send(content:any) {
        this.win?.webContents.send("languageServer", content);
    }
    onMessage(callback: any) {
        console.log("[LanguageServer] onMessage", callback);
        languageServerReady = true;
        this.win?.webContents.send("languageServerReady", true);
        ipcMain.on("languageServer", (_:any, content:any) => {
            callback(content);
        });
    }
    onError: (content:any) => void = () => { /**/ };
    onClose: (content:any) => void = () => { /**/ };

    dispose() {
        ipcMain.removeAllListeners("languageServer");
    }
}

const socket = new ElectronIPCIWebSocket();

async function launch() {
    try {
        if (!fs.existsSync("/Users/Shared/Fluidity/lsp/bin/lua-language-server")) {
            socket.win?.webContents.send("languageServer", "{\"jsonrpc\":\"2.0\",\"method\":\"$/status/report\",\"params\":{\"text\":\"Updating LSP\",\"tooltip\":\"Please wait...\"}}");
            console.log("[LanguageServer] Updating LSP");
            await new Promise((resolve) => {
                if (fs.existsSync("/tmp/lsp")) fs.rmSync("/tmp/lsp", { recursive: true });
                if (fs.existsSync("/Users/Shared/Fluidity/lsp")) fs.rmSync("/Users/Shared/Fluidity/lsp", { recursive: true });
                fs.mkdirSync("/tmp/lsp");
                fetch("https://cdn.fluidity.developer.com/mac/lsp-signed.tar.gz").then((res) => {
                    let bytes = 0;
                    const size = parseInt(res.headers.get("content-length") || "1");
                    const proc = spawn("tar", ["-xzf", "-", "-C", "/tmp/lsp"]);
                    proc.stdout.pipe(process.stdout);
                    proc.stderr.pipe(process.stderr);
                    res.body.pipe(proc.stdin);
                    res.body.on("data", (chunk) => {
                        bytes += chunk.length;
                        socket.win?.webContents.send("languageServer", "{\"jsonrpc\":\"2.0\",\"method\":\"$/status/report\",\"params\":{\"text\":\"Downloading LSP (" + Math.round((bytes / size) * 100) + "%)\",\"tooltip\":\"Please wait\"}}");
                        console.log("[LanguageServer] Downloading LSP (" + Math.round((bytes / size) * 100) + "%)");
                    });
                    proc.on("exit", () => {
                        resolve(true);
                    });
                });
            });

            socket.win?.webContents.send("languageServer", "{\"jsonrpc\":\"2.0\",\"method\":\"$/status/report\",\"params\":{\"text\":\"Installing LSP\",\"tooltip\":\"Please wait...\"}}");
            console.log("[LanguageServer] Installing LSP");
            fs.renameSync("/tmp/lsp/private/tmp/lsp", "/Users/Shared/Fluidity/lsp");
            try {
                execSync("chmod -R 777 /Users/Shared/Fluidity");
            } catch (e) { /**/ }
            fs.rmSync("/tmp/lsp", { recursive: true });
        }
        try {
            fs.chmodSync("/Users/Shared/Fluidity/lsp/bin/lua-language-server", 0o777);
        } catch (e) { /**/ }

        socket.win?.webContents.send("languageServer", "{\"jsonrpc\":\"2.0\",\"method\":\"$/status/report\",\"params\":{\"text\":\"Launching LSP\",\"tooltip\":\"Please wait...\"}}");
        console.log("[LanguageServer] Launching LSP");
        const reader = new rpc.WebSocketMessageReader(socket);
        const writer = new rpc.WebSocketMessageWriter(socket);

        const socketConnection = createConnection(reader, writer, () => socket.dispose());
        const serverConnection = createServerProcess("lua", "/Users/Shared/Fluidity/lsp/bin/lua-language-server");
        forward(socketConnection, serverConnection, (message) => {
            if (rpc.isRequestMessage(message) && message.method == InitializeRequest.type.method) {
                message.params.processId = process.pid;
            }
            return message;
        });
        console.log("[LanguageServer] Started");
    } catch (e) {
        socket.win?.webContents.send("languageServer", JSON.stringify({ jsonrpc: "2.0", method: "$/status/report", params: { text: "LSP Failed", tooltip: (e as any).toString() } }));
    }
}

ipcMain.handle("languageServerReady", () => {
    if (!languageServerReady) launch();
    return languageServerReady;
});
ipcMain.on("setLspEnabled", (_, arg) => {
    if (arg) {
        socket.win?.reload();
    } else {
        dialog.showMessageBoxSync(socket.win!, { type: "question",
            title: "Disable LSP",
            message: "Fluidity may freeze for a few seconds while the LSP is uninstalled. Select 'OK' to continue."
        });
        socket.win?.hide();
        try {
            fs.rmSync("/Users/Shared/Fluidity/lsp", { recursive: true });
            dialog.showMessageBoxSync(socket.win!, { type: "question",
                title: "LSP uninstalled",
                message: "Fluidity will now exit."
            });
        } catch (e) {
            dialog.showMessageBoxSync(socket.win!, { type: "question",
                title: "LSP disabled",
                message: "Could not finish the uninstallation process.\n" + (e as any).toString() + "\n\nFluidity will now exit."
            });
        }
        socket.win?.close();
    }
});
export function initLangServ(win: BrowserWindow) {
    socket.win = win;
}