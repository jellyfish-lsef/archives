import htm from "../../lib/htm.js";
import { Component, h } from "../../lib/preact.js";
import MessageBus from "../messageBus.js";
const html = htm.bind(h);
export class RunFab extends Component {
    constructor() {
        super();
        this.setState({
            spinstate: false
        });
        MessageBus.on("scriptRan", (page) => {
            this.setState({ spinstate: !this.state.spinstate });
        });
    }
    render() {
        return html `
            <a href="#" class="fab" id="run-script">
                <i class="material-icons ${this.state.spinstate ? "spin" : "speen"}">play_arrow</i>
            </a>
        `;
    }
}
