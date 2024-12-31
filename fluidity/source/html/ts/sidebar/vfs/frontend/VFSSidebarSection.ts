import { Icon } from "../../../components/iconRenderer.js";
import htm from "../../../lib/htm.js";
import { Component, h, VNode } from "../../../lib/preact.js";
import { VFSFolderRenderer } from "./VFSFolderRenderer.js";
const html = htm.bind(h);

export class VFSSidebarSection extends Component<{
    vfs: IVFS,
    root: monaco.Uri,
    title: string,
    icon: string,
    buttons: { [key: string]: (m: MouseEvent) => void },
    defaultOpen: boolean,
}, {isOpen:boolean}> {
    render(): VNode<any> | VNode<any>[] {
        return html`
        <div class="sidebarSection" >
            <div class="sidebarSectionHeader" isOpen=${this.state.isOpen} onclick=${() => this.setState({ isOpen: !this.state.isOpen })}>
                <div class="sidebarSectionHeaderIcon">
                    <${Icon} icon=${this.props.icon}/>
                </div>
                <div class="sidebarSectionHeaderText">
                    ${this.props.title}
                </div>
                <div class="sidebarSectionHeaderActions">
                    ${Object.entries(this.props.buttons).map(([key, value]) => html`<button class="glowyLink" onclick=${value}><i class="material-symbols">${key}</i></button>`)}
                </div>
            </div>
            <div class="sidebarSectionContent">
                ${this.state.isOpen ? h(VFSFolderRenderer, { path: this.props.root }) : ""}
            </div>
        </div>
            
            `;
    }
    componentWillMount() {
        this.setState({ isOpen: !!this.props.defaultOpen });
    }
}
