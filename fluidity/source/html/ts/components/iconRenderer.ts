import { Component, h } from "../lib/preact.js";

export class Icon extends Component<{icon: string}> {
    render() {
        return this.props.icon.startsWith("https://") ?
            h("span", { style: "background-image: url(\"" + this.props.icon + "\")", class: "imgicon" }) :
            h("i", { class: "material-symbols" }, this.props.icon);
    }
}
