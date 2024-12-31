import htm from "../lib/htm.js";
import { Component, h } from "../lib/preact.js";
const html = htm.bind(h);

export class Titlebar extends Component<{text: string}, unknown> {
    render() {
        return html`<div class="titlebar" id="titlebar"><p class="titlebar-text"><b>Jellyfish ${navigator.userAgent.split(" Chrome/")[0].split("/").pop()}
        </b>${this.props.text ? " - " + this.props.text : ""}</p></div>`;
    }
}