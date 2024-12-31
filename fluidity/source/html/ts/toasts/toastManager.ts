import htm from "../lib/htm.js";
import { h } from "../lib/preact.js";
const html = htm.bind(h);

export class Toast {
    domel = document.createElement("div");
    constructor(props: {icon: string, title: string, message?: string, type?: "accent" | "success" | "danger" | "info", timeout?: number}) {
        this.domel.className = "toast " + props.type;
        this.domel.innerText = props.message || "";
        const title = document.createElement("b");
        title.className = "toastTitle";
        title.innerText = props.title;
        title.innerHTML = "<i class='material-symbols'>" + props.icon + "</i> " + title.innerHTML;
        this.domel.innerHTML = title.outerHTML + " " + this.domel.innerHTML;
        if (props.timeout) setTimeout(this.dismiss.bind(this), props.timeout);

        document.getElementById("toastContainer")?.appendChild(this.domel);
        setTimeout(() => this.domel.setAttribute("visible", "true"), 33);
        if (!document.hasFocus()) {
            new Notification(
                props.title,
                { body: props.message }
            );
        }
    }
    dismiss() {
        this.domel.removeAttribute("visible");
        setTimeout(() => this.domel.remove(), 500);
    }
}
(window as any).toast = Toast;