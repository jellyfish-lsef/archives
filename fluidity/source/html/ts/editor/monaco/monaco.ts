import swapi from "../../api/SWAPI.js";
import htm from "../../lib/htm.js";
import { Component, h } from "../../lib/preact.js";
import monacoPromise from "./monacoLoader.js";
const html = htm.bind(h);

let editor: monaco.editor.IStandaloneCodeEditor | null;

// eslint-disable-next-line no-shadow
let resolve: (editor: monaco.editor.IStandaloneCodeEditor) => void;
export const editorPromise = new Promise<monaco.editor.IStandaloneCodeEditor>((r) => resolve = r);

interface editorResumeState {
    active: string;
    viewState: monaco.editor.ICodeEditorViewState;
    models: { [key: string]: {language: string, value: string, modified: boolean} };
}

interface Model extends monaco.editor.IModel {
    modified: boolean;
}

function changeListener(this: Model, _event: monaco.editor.IModelContentChangedEvent) {
    // eslint-disable-next-line no-invalid-this
    this.modified = true;
}

export async function killModel(model: monaco.editor.ITextModel) {
    const mainEditor = await editorPromise;
    const currentModel = mainEditor.getModel();
    const inuse = model.isAttachedToEditor();
    model.dispose();
    setTimeout(() => {
        const nextModel = inuse ? [...monaco.editor.getModels()].pop() : currentModel;
        if (nextModel) mainEditor.setModel(nextModel);
    });
}

export function newModel(text: string, path?: string | monaco.Uri) {
    let uri;
    switch (typeof path) {
        case "string":
            uri = monaco.Uri.parse(path);
            break;
        case "object":
            uri = path;
            break;
        default:
            uri = monaco.Uri.parse("fluiditytemp://temp " + Math.random().toString(36).substring(2) + ".lua");
            break;
    }
    const existingModel = monaco.editor.getModel(uri);
    if (existingModel) {
        editor?.setModel(existingModel);
        return existingModel;
    }
    const model = monaco.editor.createModel(text, "lua", uri);
    model.onDidChangeContent(changeListener.bind(model as Model));
    editor?.setModel(model);
    return model;
}
(window as any).newModel = newModel;

async function initEditor(component: HTMLElement) {
    const monaco = await monacoPromise;
    editor = monaco.editor.create(component, {
        automaticLayout: true,
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Fira Mono', 'Droid Sans Mono', Menlo, Monaco, 'Courier New', monospace",
        cursorSmoothCaretAnimation: true,

        smoothScrolling: true,
        cursorBlinking: "smooth",

        folding: true,
        foldingHighlight: false,
        showFoldingControls: "always",
        dragAndDrop: true,
        links: true,
        formatOnPaste: false,

        showDeprecated: true,
        suggest: { snippetsPreventQuickSuggestions: false }

    });
    (window as any).editor = editor;
    resolve(editor);
    try {
        const modelSave = JSON.parse(localStorage.getItem("editor-resume")!) as editorResumeState;
        for (const uri in modelSave.models) {
            const m = modelSave.models[uri];
            const model = monaco.editor.createModel(m.value, m.language, monaco.Uri.parse(uri)) as Model;
            model.onDidChangeContent(changeListener.bind(model));
            model.modified = m.modified;
            if (modelSave.active === uri) {
                editor.setModel(model);
            }
        }
        editor.restoreViewState(modelSave.viewState);
    } catch (e) {
        console.error(e);
        newModel("print(\"Welcome to Fluidity!\")");
    }
}

window.addEventListener("beforeunload", (e) => {
    console.log("Saving editor state");
    if (!editor || !editor.getModel()) {
        return localStorage.removeItem("editor-resume");
    }
    const modelSave = {
        viewState: editor.saveViewState(),
        models: {} as { [key: string]: {language: string, value: string, modified: boolean} },
        active: null
    };
    for (const model of monaco.editor.getModels()) {
        const uri = (model.uri as any)._formatted || model.uri;
        modelSave.models[uri] = {
            value: model.getValue(),
            modified: (model as Model).modified,
            language: model.getLanguageId()
        };
        if (model.isAttachedToEditor()) {
            modelSave.active = uri;
        }
    }
    console.log(modelSave);
    localStorage.setItem("editor-resume", JSON.stringify(modelSave));
});

async function handleLinkClick(url: URL) {
    try {
        if (url.pathname.endsWith(".txt") || url.pathname.endsWith(".lua")) {
            const model = newModel("", monaco.Uri.parse(url.toString()));
            fetch(url.toString())
                .then((r) => { if (!r.ok) throw new Error("Failed to fetch file"); return r; })
                .then((r) => r.text())
                .then((t) => {
                    if (t.trim().startsWith("<!DOCTYPE html>") || t.trim().startsWith("<html>")) {
                        throw new Error("html");
                    }
                    model.setValue(t);
                })
                .catch((e) => {
                    realopen(url);
                    model.dispose();
                });
        } else if (url.hostname == "dashboard.fluidity.com" && url.searchParams.has("scriptID")) {
            const details = await swapi.makeDashboardApiRequest("scripts/" + url.searchParams.get("scriptID")).then((r) => r.json()) as ScriptLibraryScriptInfo;
            if (!details || !details.name) return realopen(url);
            newModel("", monaco.Uri.parse("swui-script://" + details.id + "/" + details.name.replace(/\//g, String.fromCharCode(8725)) + "/" + details.thumbnail));
        }
    } catch (e) {
        realopen(url);
    }
}

const realopen = window.open;
function openShim(url?: string | URL, target?: string, features?: string) {
    // monaco doesn't provide a ctrl+click override so i have to do this fuckery
    const calledFromMonaco = new Error().stack?.includes("windowOpenNoOpener");
    if (calledFromMonaco) {
        handleLinkClick(new URL(url!.toString()));
        return null;
    } else {
        return realopen(url, target, features);
    }
}
window.open = openShim;

export class MonacoEditor extends Component {
    base?: HTMLElement;
    shouldComponentUpdate() { return false; }
    render() {
        return h("div", { id: "monacoEditor" });
    }
    componentDidMount() {
        initEditor(this.base!);
    }
}
