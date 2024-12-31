import { spawnSync } from "child_process";
import { ipcMain } from "electron";
import * as fs from "fs";
import * as keytar from "keytar";
import * as path from "path";
import { CALAMARI_API_LOCATION, KEYCHAIN_SERVICE } from "./consts";

export let savedHwid: string | undefined = "abcdefghijklmnopqrstuvwx0123456789";

export function fdtyauth2(args: string[]) {
    if (1) return "true.1000.fakeauthtoken";
    try {
        const location = path.join(CALAMARI_API_LOCATION, "FDTYAuth3");
        if (!savedHwid) {
            console.log("Dropping FDTYAuth3");
            fs.copyFileSync(path.join(__dirname, "../FDTYAuth3"), location);
            fs.chmodSync(location, "0777");
        }
        // location = path.join("/Users/foxt/Library/Developer/Xcode/DerivedData/FDTYAuth2-fnhwcmxsvcewscbfuafiqubbhooo/Build/Products/Debug/", "FDTYAuth2");
        // convert arguments to base64
        args = args.map((a) => Buffer.from(a).toString("base64"));
        const proc = spawnSync(location, args, { env: { } });
        const stdout = proc.stdout.toString();
        console.log(stdout, proc.stderr.toString());
        if (stdout.includes("<hwid:")) savedHwid = stdout.replace(/.*<hwid:([\dA-F]+)>.*/gs, "$1");
        if (stdout.includes("<result:")) return stdout.replace(/.*<result:(.*?)>.*/gs, "$1");
        else if (args.length) throw new Error("Authentication process didn't return a result. \n" + stdout + "\n" + proc.stderr.toString());
        else return;
    } catch (e) {
        console.error(e);
        // dialog.showErrorBox("Could not authenticate", (e as any).toString());
        return "false." + e;
    }
}
ipcMain.handle("auth", (_, args) => fdtyauth2(args));

ipcMain.handle("auth-get-accounts", () => keytar.findCredentials(KEYCHAIN_SERVICE));
ipcMain.handle("auth-set-account", (_, arg) => keytar.setPassword(KEYCHAIN_SERVICE, arg.username, arg.password));
ipcMain.handle("auth-delete-account", (_, arg) => keytar.deletePassword(KEYCHAIN_SERVICE, arg.username));
