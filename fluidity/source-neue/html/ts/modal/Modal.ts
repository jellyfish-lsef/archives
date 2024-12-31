import { Attributes, Component, ComponentType, h, render } from "../lib/preact.js";

type Modal<PROPS, CB> = {
    type: ComponentType<PROPS>,
    props: PROPS,
    allowUserClose: boolean,
    callback: (data: CB) => void,
}

let setModalState: typeof Component.prototype.setState;
const modals: Modal<any, any>[] = [];

// eslint-disable-next-line @typescript-eslint/ban-types
class UiModal extends Component<{}, {modals: Modal<any, any>[]}> {
    render() {
        if (this.state.modals.length === 0) {
            document.body.classList.remove("showModal");
            return null;
        } else {
            document.body.classList.add("showModal");
            const m = this.state.modals[0];
            return h(m.type, {
                ...m.props,
                onCompletion: this.modalClosed.bind(this)
            });
        }
    }
    modalClosed(data: any) {
        const modal = modals.shift();
        if (modal) modal.callback(data);
        setModalState({ modals });
    }
    constructor() {
        super();
        this.setState({ modals });
        setModalState = this.setState.bind(this);
    }
}


export function pushModal<P>(modalType:ComponentType<P>, allowUserClose: boolean, props: Omit<Attributes & P, "onCompletion">) {
    return new Promise((resolve) => {
        modals.unshift({ type: modalType, props, callback: resolve, allowUserClose });
        setModalState({ modals });
    });
}
export function popModal(force = false) {
    const first = modals[0];

    if (!first) return;
    if (first.allowUserClose || force) {
        modals.shift();
        setModalState({ modals });
    }
}

const parent = document.getElementById("keyBox")!;
parent.innerHTML = "";
render(h(UiModal, {}), parent);

const modal = document.getElementById("keyModal");
modal?.addEventListener("click", (evt) => {
    if ((evt.target! as HTMLElement).id == "keyModal") popModal();
});

