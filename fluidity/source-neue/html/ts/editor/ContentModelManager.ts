import htm from "../lib/htm.js";
import { Component, h } from "../lib/preact.js";
import { SettingsPage } from "../settings/settingsPage.js";
import { ScriptContent } from "./contentPages/script.js";
import { UserContent } from "./contentPages/user.js";
const html = htm.bind(h);



// eslint-disable-next-line @typescript-eslint/ban-types
export class ContentModel extends Component<{uri: monaco.Uri | null}> {
    render() {
        switch (this.props.uri?.scheme) {
            case "swui-settings":
                return h(SettingsPage, {});
            case "swui-script":
                return h(ScriptContent, { uri: this.props.uri });
            case "swui-user":
                return h(UserContent, { uri: this.props.uri });
            default:
                return html`Unknown scheme ${this.props.uri?.scheme}`;
        }
    }
}