import htm from "../../lib/htm.js";
import { Component, h } from "../../lib/preact.js";
const html = htm.bind(h);
export class ToolsPage extends Component {
    render() {
        return html `<div class="page" id="page-tools">
            More coming soon...
            <div id="credits">
                <hr/>
                <p>
                    © 2022 <a href="https://developer.com/">developer</a>.<br/>
                    <b>Credits to:</b><br/>
                    <a href="https://github.com/iUnstable0/">iUnstable0</a> - improved code editor
                    <!-- <a href="https://github.com/LoganDark/">LoganDark</a> - """"moral support""""<br> -->
                </p>
                <p class="credits-footer">
                    trans rights are human rights :3
                </p>
            </div>
        </div>`;
    }
}
