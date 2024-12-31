
async function getProcessess() {
    let proc = require("child_process").spawn("ps", ["exo", "pid,args"]);
    let stdout = "";
    proc.stdout.on("data", (data) => { stdout += data.toString(); });
    await (new Promise((a, r) => { proc.on("close", a); proc.on("error", r); }));
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
        .map((e) => ({ pid: parseInt(e.shift()), command: e.shift(), arguments: e }));
}
if (module) module.exports = getProcessess;