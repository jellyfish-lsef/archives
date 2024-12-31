import htm from "../lib/htm.js";
import { Component, h } from "../lib/preact.js";
const html = htm.bind(h);

export class UiModalHeader extends Component<{text:string, icon: string}> {
    render() {
        return html`
            <span class="header"><img width="85" height="85" src="${this.props.icon}" /></span>
        `;
    }
}
