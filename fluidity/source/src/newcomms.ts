import * as electron from "electron";
import { EventEmitter } from "events";
import * as fs from "fs";
import * as net from "net";
import { IPC_LOCATION_PORT } from "./consts";

const BASEPORT = 56913;

type NewCommsConnectionStatus = "disconnected" | "connecting" | "connected";
export const enum NewCommsMessageType {
    RECV_HELLO = "H",
    RECV_CONSOLE = "C",
    RECV_SCRIPT_ACK = "S",
    RECV_CONSOLE_INPUT = "I",

    SEND_AUTH = "a",
    SEND_SCRIPT = "s",
    SEND_CONSOLE_INPUT = "c",

}

export class NewCommsConnection extends EventEmitter {
    status: NewCommsConnectionStatus = "connecting";
    socket : net.Socket;
    pid: number | null = null;
    constructor(socket : net.Socket) {
        super();
        this.socket = socket;
        let buffer = "";
        socket.on("data", (data) => {
            buffer += data.toString();
            const zeroSplit = buffer.split("\0");
            while (zeroSplit.length > 1) {
                const packet = zeroSplit.shift();
                console.log("[ncomm] Incoming ", packet);
                switch (packet?.charAt(0)) {
                    case NewCommsMessageType.RECV_HELLO:
                        if (this.pid) {
                            console.log("[ncomm] Already have a PID, ignoring");
                            break;
                        }
                        this.pid = parseInt(packet.substring(1));
                        this.status = "connected";
                        this.emit("hello");
                        break;
                    case NewCommsMessageType.RECV_SCRIPT_ACK:
                        this.emit("script_ack");
                        break;
                    case NewCommsMessageType.RECV_CONSOLE:
                        this.emit("console", packet.substring(1));
                        break;
                    case NewCommsMessageType.RECV_CONSOLE_INPUT:
                        this.emit("input", packet.substring(1));
                        break;
                    default:
                        console.log("[ncomm] Unknown packet", packet);
                }
                buffer = zeroSplit.join("\0");
            }
        });
        socket.on("end", () => {
            this.status = "disconnected";
            this.emit("disconnected");
        });
    }
    send(type: NewCommsMessageType, data:string) {
        this.socket.write(type + data + "\0");
    }
}


class NewComms extends EventEmitter {
    connectionHandler(c: net.Socket) {
        console.log("[ncomm] Connection from", c.remoteAddress, c.remotePort);
        const connection = new NewCommsConnection(c);
        this.emit("connection", connection);
    }
    server = net.createServer(this.connectionHandler.bind(this));
    listenAttempts = 0;
    tryListen(port: number) {
        this.listenAttempts++;
        console.log("[ncomm] Trying to listen on port", port);
        this.server.listen(port, "127.0.0.1");
    }
    // eslint-disable-next-line handle-callback-err
    error(err:Error) {
        console.log("[ncomms] Error: ", err);
        if (this.server.listening) return;
        if (this.listenAttempts > 100) {
            electron.dialog.showErrorBox("Could not start newcomms listener", "A critical problem has occured and the newcomms listener has failed to start. Please restart your computer, if this problem persists, please contact support.\n\n" + err.toString());
            process.exit();
        } else {
            this.listenAttempts++;
            this.tryListen(BASEPORT + this.listenAttempts);
        }
    }

    init() {
        try {
            const firstPortAttemptC = fs.readFileSync(IPC_LOCATION_PORT, "utf8");
            const firstPortAttempt = parseInt(firstPortAttemptC);
            if (isNaN(firstPortAttempt)) {
                throw new Error("IPC location is not a number");
            }
            this.tryListen(firstPortAttempt);
        } catch (e) {
            this.error(e as Error);
        }
    }

    constructor() {
        super();
        this.server.on("error", this.error.bind(this));
        this.server.on("listening", () => {
            console.log("[ncomm] Listening on", this.server.address());
            try {
                fs.writeFileSync(IPC_LOCATION_PORT, (this.server.address() as {port: number}).port.toString());
                try {
                    fs.chmodSync(IPC_LOCATION_PORT, "0777");
                } catch (e) {}
            } catch (e) {
                electron.dialog.showErrorBox("Could not write to IPC location", "A critical problem has occured and the IPC location could not be written to. Please restart your computer, if this problem persists, please contact support.\n\n" + (e as any).toString());
                process.exit();
            }
        });
    }
}
export const newComms = new NewComms();