import { createWriteStream } from "fs";
import { cpus, homedir, version } from "os";
import { join } from "path";

export function redirectLogs() {
    const logWriteStream = createWriteStream(join(homedir(), "Library", "Logs", "Fluidity.log"));
    let lastMessage = "";
    const logRedirector = (target: NodeJS.WritableStream, color: string) => {
        const write = target.write;
        target.write = (output:any) => {
            try {
                const pfx = "\x1B[3" + color + "m[" + new Date() + "]    ";
                const trimmed = output.toString().trimEnd();
                // eslint-disable-next-line no-control-regex
                let out = pfx + trimmed.replace(/\n/g, "\n" + pfx).replace(/\x1B\[3.m/g, "\x1B[3" + color + "m") + "\n";
                if (lastMessage == out) {
                    out = "🔁";
                } else {
                    out = "\n" + out;
                    lastMessage = out;
                }
                logWriteStream.cork();
                logWriteStream.write(out);
                logWriteStream.uncork();
                return write.call(target, output);
            } catch (e) { return false; }
        };
    };
    logRedirector(process.stdout, "9");
    logRedirector(process.stderr, "1");
    process.on("uncaughtException", console.error);
    process.on("unhandledRejection", console.error);

    console.log("Fluidity " + require("../package.json").version + " running on " + process.arch);
    console.log(version());
    console.log("CPU: " + cpus()[0]?.model);
}