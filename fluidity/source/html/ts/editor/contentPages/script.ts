import swapi from "../../api/SWAPI.js";
import { UiDescription } from "../../components/descriptionRenderer.js";
import { Icon } from "../../components/iconRenderer.js";
import { RunButtons } from "../../components/runButtons.js";
import htm from "../../lib/htm.js";
import { Component, h } from "../../lib/preact.js";
import { Toast } from "../../toasts/toastManager.js";
import { killModel, newModel } from "../monaco/monaco.js";
const { clipboard } = require("electron");
const html = htm.bind(h);

const dateFormatter = new Intl.DateTimeFormat(
    "en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    });


// eslint-disable-next-line @typescript-eslint/ban-types
export class ScriptContent extends Component<{uri: monaco.Uri}, {info?: ScriptLibraryScriptInfo, actionInProgress: boolean}> {
    render() {
        if (!this.state.info) {
            const split = this.props.uri.path.split("/");
            const name = decodeURIComponent(split[1]);
            const icon = decodeURIComponent(split[2]);
            return html`<div class="contentPage content-script">
                <div class="contentPageHeader glowing">
                    <div class="contentPageHeaderImage" style="background-image: url(${icon || "https://fluidity.com/assets/img/script.png"})" alt="" />
                    <div class="contentPageHeaderInfo">
                        <h1>${name}</h1>
                    </div>
                </div>
            </div>`;
        }

        const badges = [];
        if (this.state.info?.saved) badges.push(h("i", { class: "material-symbols" }, "bookmark"));
        if (this.state.info?.verified_publisher) badges.push(h("i", { class: "material-symbols" }, "verified_user"));
        if (this.state.info?.open_source == 1) badges.push(h("i", { class: "material-symbols" }, "lock_open"));


        const actions = [];
        actions.push(h(RunButtons, { getScript: () => "import(" + this.state.info?.id + ")", type: "outlinedBtn primary" }));
        actions.push(html`<button class="outlinedBtn" onclick=${this.toggleSave.bind(this)}><i class="material-symbols">${this.state.info.saved ? "bookmark_remove" : "bookmark_add"}</i> ${this.state.info.saved ? "Unsave" : "Save"}</button>`);
        if (this.state.info.open_source == 1) actions.push(html`<button class="outlinedBtn" onclick=${this.viewSrc.bind(this)}><i class="material-symbols">code</i> View Source</button>`);
        actions.push(html`<button class="outlinedBtn" onclick=${this.copyLink.bind(this)}><i class="material-symbols">content_copy</i> Copy Link</button>`);
        // actions.push(html`<button class="outlinedBtn danger" onclick=${this.report.bind(this)}><i class="material-symbols">flag</i> Report Abuse</button>`);


        const rating = this.state.info.rating ? this.state.info.rating.rating : "none";
        console.log(rating);
        return html`
                <div class="contentPage content-script">
                    <div class="contentPageHeader">
                        <div class="contentPageHeaderImage" style="background-image: url(${this.state.info.thumbnail})" alt="${this.state.info.name}" />
                        <div class="contentPageHeaderInfo">
                            <h1>${this.state.info.name} ${badges}</h1>
                            <h2>
                                by <a class="authorLink" href="#" onclick=${() => newModel("", "swui-user://" + this.state.info?.created_by + "/" + encodeURIComponent(this.state.info!.publisher_avatar!))}>
                                    <${Icon} icon="${this.state.info.publisher_avatar}" /> ${this.state.info.created_by}
                                </a> • ${this.state.info.total_saves} saves • ${this.state.info.category} • created ${dateFormatter.format(new Date(this.state.info.created_at))} ${this.state.info.created_at !== this.state.info.updated_at ? " • updated " + dateFormatter.format(new Date(this.state.info.updated_at)) : ""}
                            </h2>
                        </div>
                    </div>
                    <div class="contentPageActions" isBusy=${this.state.actionInProgress}>
                    ${actions}
                    </div>
                    <div class="rating">
                        <div class="ratingBarHeader" rating=${rating} isBusy=${this.state.actionInProgress}>
                            <button class="ratingBarButton" id="likeButton" onclick=${() => this.rate("like")}>
                                <i class="material-symbols">thumb_up</i> ${this.state.info.likes}
                            </button>
                            <div class="grow"></div>
                            <button class="ratingBarButton" id="dislikeButton" onclick=${() => this.rate("dislike")}>
                                <i class="material-symbols">thumb_down</i> ${this.state.info.dislikes}
                            </button>
                        </div>
                        ${
    this.state.info.likes + this.state.info.dislikes > 0 ?
        h("progress", { class: "ratingBar", value: this.state.info.likes, max: this.state.info.likes + this.state.info.dislikes }) :
        ""
}
                    </div>
                    <${UiDescription} text="${this.state.info?.description}" />
                </div>
            
            `;
    }
    async toggleSave() {
        this.setState({ actionInProgress: true });
        if (this.state.info?.saved) {
            await swapi.makeDashboardApiRequest("scripts/unsave/" + this.state.info!.id);
        } else {
            await swapi.makeDashboardApiRequest("scripts/save/" + this.state.info!.id);
        }
        this.refresh();
    }
    viewSrc() {
        const model = newModel("", "fluiditytemp://" + this.state.info?.id + "/" + this.state.info?.name.replace(/[^a-zA-Z0-9 ]/g, "") + ".lua");
        swapi.makeDashboardApiRequest("scripts/opensource/" + this.state.info!.id).then((res) => res.text()).then((value) => {
            model.setValue(value);
        });
    }
    copyLink() {
        clipboard.writeText("https://dashboard.fluidity.com/catalogue?scriptID=" + this.state.info!.id);
    }
    report() {
        // TODO: reporting
    }
    async rate(value: "like" | "dislike") {
        this.setState({ actionInProgress: true });
        if (this.state.info?.rating) await swapi.makeDashboardApiRequest("scripts/rate/" + this.state.info!.id, { method: "DELETE" });
        if (this.state.info?.rating && this.state.info.rating.rating == value) return this.refresh();
        await swapi.makeDashboardApiRequest("scripts/rate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: this.state.info!.id,
                rating: value
            })
        });
        this.refresh();
    }

    componentWillReceiveProps(nextProps: {uri: monaco.Uri}) {
        if (nextProps.uri!.authority != this.props.uri.authority) {
            this.setState({ info: undefined });
            this.props.uri = nextProps.uri;
            this.refresh();
        }
    }
    async refresh() {
        await swapi.makeDashboardApiRequest("scripts/" + this.props.uri.authority)
            .then((res) => {
                if (res.ok) return res.json();
                else throw new Error(res.status + " " + res.statusText);
            })
            .then((info) => this.setState({ info, actionInProgress: false }))
            .catch((err) => {
                new Toast({
                    icon: "sync_problem",
                    type: "danger",
                    title: "Error loading script",
                    message: err.message,
                    timeout: 3000
                });
                if (err.message.startsWith("404")) {
                    monaco.editor.getModels().filter((model) => model.uri == this.props.uri).forEach(killModel);
                }
            });
    }
    componentWillMount() {
        this.refresh();
    }
}
