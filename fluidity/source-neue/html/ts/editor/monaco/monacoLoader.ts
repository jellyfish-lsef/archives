// loading monaco in non-packed environment is absolutely dogshite
//  i mean, it's better than using webpack :^)
import { l as LanguageClient } from "../../lib/languageserver.js";
import settings from "../../settings/settingsManager.js";
import { luaLanguageConfiguration, luaLanguageDefinition } from "./language/definition.js";

import registerKeywords from "./intellisense.js";
import { connectLanguageServer } from "./language/languageServerConnector.js";




const amdLoader = require("./assets/monaco-editor/min/vs/loader.js");
const path = require("path");
const amdRequire = amdLoader.require;

function uriFromPath(_path:string) {
    let pathName = path.resolve(_path).replace(/\\/g, "/");
    if (pathName.length > 0 && pathName.charAt(0) !== "/") {
        pathName = "/" + pathName;
    }
    return encodeURI("file://" + pathName);
}

amdRequire.config({
    baseUrl: uriFromPath(path.join(__dirname, "./assets/monaco-editor/min"))
});

// @ts-expect-error workaround monaco-css not understanding the environment
self.module = undefined;

const monacoPromise: Promise<typeof monaco> = new Promise((resolve) => {
    amdRequire(["vs/editor/editor.main"], () => {
        monaco.editor.defineTheme("jellyfish", { base: "vs-dark", inherit: true, rules: [{ foreground: "5c6370", fontStyle: " italic", token: "comment" }, { foreground: "b8cae8ff", token: "keyword.operator.class" }, { foreground: "b8cae8ff", token: "constant.other" }, { foreground: "b8cae8ff", token: "source.php.embedded.line" }, { foreground: "fa6e7c", token: "variable" }, { foreground: "fa6e7c", token: "support.other.variable" }, { foreground: "fa6e7c", token: "string.other.link" }, { foreground: "fa6e7c", token: "string.regexp" }, { foreground: "fa6e7c", token: "entity.name.tag" }, { foreground: "fa6e7c", token: "entity.other.attribute-name" }, { foreground: "fa6e7c", token: "meta.tag" }, { foreground: "fa6e7c", token: "declaration.tag" }, { foreground: "eeb164ff", token: "constant.numeric" }, { foreground: "eeb164ff", token: "constant.language" }, { foreground: "eeb164ff", token: "support.constant" }, { foreground: "eeb164ff", token: "constant.character" }, { foreground: "eeb164ff", token: "variable.parameter" }, { foreground: "eeb164ff", token: "punctuation.section.embedded" }, { foreground: "eeb164ff", token: "keyword.other.unit" }, { foreground: "eee280ff", token: "entity.name.class" }, { foreground: "eee280ff", token: "entity.name.type.class" }, { foreground: "eee280ff", token: "support.type" }, { foreground: "eee280ff", token: "support.class" }, { foreground: "adee7aff", token: "string" }, { foreground: "adee7aff", token: "entity.other.inherited-class" }, { foreground: "adee7aff", token: "markup.heading" }, { foreground: "b8cae8ff", token: "constant.other.color" }, { foreground: "61cbeeff", token: "entity.name.function" }, { foreground: "61cbeeff", token: "meta.function-call" }, { foreground: "61cbeeff", token: "support.function" }, { foreground: "61cbeeff", token: "keyword.other.special-method" }, { foreground: "61cbeeff", token: "meta.block-level" }, { foreground: "ec7beeff", token: "keyword" }, { foreground: "ec7beeff", token: "storage" }, { foreground: "ec7beeff", token: "storage.type" }, { foreground: "ec7beeff", token: "entity.name.tag.css" }, { foreground: "ec7beeff", token: "keyword.operator" }, { foreground: "eeeeeeff", background: "ee7c80ff", token: "invalid" }, { foreground: "b8cae8ff", background: "6b4f4fff", token: "meta.separator" }, { foreground: "243043ff", background: "ee864dff", token: "invalid.deprecated" }, { foreground: "4fe1eeff", token: "constant.character" }, { foreground: "4fe1eeff", token: "constant.other" }], colors: { "editor.foreground": "#BFCAE0", "editor.background": "#33221100", "editor.selectionBackground": "#3D4350", "editor.lineHighlightBackground": "#4C576730", "editorCursor.foreground": "#528BFF", "editorWhitespace.foreground": "#747369" } });
        monaco.editor.setTheme("jellyfish");

        LanguageClient.MonacoServices.install(monaco);
        monaco.languages.register({
            id: "lua",
            extensions: [".lua"],
            aliases: ["Lua", "lua"]
        });
        monaco.languages.setMonarchTokensProvider("lua", luaLanguageDefinition);
        monaco.languages.setLanguageConfiguration("lua", luaLanguageConfiguration);

        settings.lspEnabled ? connectLanguageServer() : registerKeywords();
        resolve(monaco);
    });
});

export default monacoPromise;