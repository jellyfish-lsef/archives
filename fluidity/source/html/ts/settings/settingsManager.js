const { ipcRenderer } = require("electron");


class SettingsManager {
    topmost = false;
    opacity = 1;
    fpsUnlock = false;
    antiAfk = false;
    injectionDelay = "4";
    autoHideSidebar = true;
    lspEnabled = false;


    constructor() {
        let prox = new Proxy(this, this);
        for (let prop in this) {
            // eslint-disable-next-line no-self-assign
            prox[prop] = prox[prop];
        }
        return prox;
    }
    get(target, prop) {
        let stored = localStorage.getItem(prop);
        return stored ? JSON.parse(stored) : target[prop];
    }
    set(target, prop, value) {
        console.log(`Setting ${prop} to ${value}`);
        localStorage.setItem(prop, JSON.stringify(value));
        document.body.setAttribute(prop, value);
        ipcRenderer.send(prop, value);
        return true;
    }
}
const settings = new SettingsManager();
export default settings;