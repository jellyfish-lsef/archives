import { Component, h } from "../lib/preact.js";

export class UiDescription extends Component<{text:string}> {
    render() {
        if (!this.props.text) return;
        const descriptionIsHtml = this.props.text.startsWith("<");
        if (descriptionIsHtml) {
            const iframesrc = `<style>
            @import url("./assets/font/fonts.css");
            body { 
                --font-family: "Inter", sans-serif;
                --accent: #62A3F4;
                --text: #fff;
                margin: 0; padding: 0; color: #fff; 
                color: var(--text);
                font-family: var(--font-family);
            }
            a { color: var(--accent); }</style>
            <body>${this.props.text}</body>
        `;
            return h("iframe", { class: "description", sandbox: "allow-popups", srcdoc: iframesrc });
        } else {
            return h("span", { class: "description", innerText: this.props.text });
        }
    }
}
