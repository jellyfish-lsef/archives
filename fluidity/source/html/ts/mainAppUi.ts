import { Console, fit } from "./console/console.js";
import { ContentModel } from "./editor/ContentModelManager.js";
import { Editor } from "./editor/editorComponent.js";
import { editorPromise } from "./editor/monaco/monaco.js";
import htm from "./lib/htm.js";
import { Component, h } from "./lib/preact.js";
import { Sidebar } from "./sidebar/sidebar.js";
import { TabBar } from "./tabbar.js";
const html = htm.bind(h);


// eslint-disable-next-line @typescript-eslint/ban-types
export class FluidityApp extends Component<{}, {editorModelUri: monaco.Uri | null}> {
    render() {
        let containing = "nothing";
        if (this.state.editorModelUri) {
            const uri = this.state.editorModelUri;
            switch (uri.scheme) {
                case "swui-console":
                    containing = "console";
                    setTimeout(() => fit.fit(), 30);
                    break;
                case "swui-settings":
                case "swui-script":
                case "swui-user":
                    containing = "content";
                    break;
                default:
                    containing = "editor";
            }
        }
        return html`
            <div id="contentContainer">
                <${TabBar}/>
                <div id="editorContainer" containing="${containing}">
                    <${Editor}/>
                    <${Console}/>
                    <div id="contentPageContainer"><${ContentModel} uri=${this.state.editorModelUri}/></div>
                </div>
            </div>
            <${Sidebar}/>
        `;
    }
    constructor() {
        super();
        editorPromise.then((editor) => {
            editor.onDidChangeModel((e) => {
                this.setState({ editorModelUri: e.newModelUrl });
            });
            this.setState({ editorModelUri: editor.getModel()?.uri });
        });
    }
}


