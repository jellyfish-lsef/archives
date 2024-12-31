import { j as JSONRPC, l, l as LanguageClient } from "../../../lib/languageserver.js";
import type { MessageConnection } from "../../../lib/languageservertypes/jsonrpc/index.js";
const { ipcRenderer } = require("electron");

class ElectronIPCSocket {
    onmessage: (content:any) => void = () => { /**/ };
    constructor() {
        ipcRenderer.on("languageServer", (_:any, content:any) => {
            console.warn("languageServer", content);
            this.onmessage({ data: content });
        });
    }
    send(content:any) {
        console.debug("languageServer", content);
        ipcRenderer.send("languageServer", content);
    }
    dispose() {
        ipcRenderer.removeAllListeners("languageServer");
    }
    // eslint-disable-next-line accessor-pairs
    set onopen(_listener:() => void) {
        console.log("[languageServer] onOpen", _listener);

        ipcRenderer.invoke("languageServerReady").then((ready:boolean) => {
            if (ready) _listener();
            else ipcRenderer.on("languageServerReady", () => _listener());
        });
    }
}

function createLanguageClient(connection: MessageConnection) {
    return new l.MonacoLanguageClient({
        name: "Fluidity Lua Language Server",


        clientOptions: {
            documentSelector: ["lua"],
            errorHandler: {
                error: () => 1,
                closed: () => 1
            }
        },
        connectionProvider: {
            get: (errorHandler, closeHandler) => {
                console.log("[LanguageServer] Providing connection");
                return Promise.resolve(LanguageClient.createConnection(connection, errorHandler, closeHandler));
            }
        }
    });
}

export function connectLanguageServer() {
    console.log("[LanguageServer] Connecting");
    JSONRPC.listen({
        webSocket: (new ElectronIPCSocket() as any) as WebSocket,
        onConnection: (connection) => {
            console.log("[LanguageServer] Connected");
            const languageClient = createLanguageClient(connection);
            languageClient.start();
        }
    });
}