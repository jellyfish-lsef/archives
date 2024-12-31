var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const child_process = require("child_process");
export function getProcesses() {
    return __awaiter(this, void 0, void 0, function* () {
        const proc = child_process.spawn("ps", ["exo", "pid,args"]);
        let stdout = "";
        proc.stdout.on("data", (data) => { stdout += data.toString(); });
        yield (new Promise((a, r) => {
            proc.on("close", a);
            proc.on("error", r);
        }));
        return stdout
            // split each individual process
            .split("\n")
            // filter for RobloxPlayer only
            .filter((e) => e.includes("RobloxPlayer") && e.includes("-ticket") && !e.includes("--crashHandler"))
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
            .map((e) => ({ pid: parseInt(e.shift() || ""), command: e.shift() || "", arguments: e }));
    });
}
