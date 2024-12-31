import htm from "../lib/htm.js";
import { Component, h } from "../lib/preact.js";
const html = htm.bind(h);

export class UiSidebarHeader extends Component<{text:string}> {
    render() {
        return html`
            <div class="sidebarHeader">
                <b>${this.props.text}</b>
            </div>
        `;
    }
}
