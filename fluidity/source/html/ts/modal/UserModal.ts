import { UiDescription } from "../components/descriptionRenderer.js";
import { UiModalHeader } from "../components/modalHeader.js";
import friendsManager from "../friends/logic/friendManager.js";
import htm from "../lib/htm.js";
import { Component, h } from "../lib/preact.js";
import { pushModal } from "./Modal.js";
const html = htm.bind(h);


class UiModalUser extends Component<{
    username: string,
    onCompletion: () => void
}, {userInfo?: UserProfile, friend?: Friend, actionInProgress: boolean}> {
    render() {
        const username = this.state.userInfo?.username || this.state.friend?.username || this.props.username;
        const avatar = this.state.userInfo?.avatar || this.state.friend?.avatar;
        const badges = [];
        if (this.state.userInfo?.staff) badges.push(h("img", { style: "height:1em;", alt: "Fluidity Staff", src: "./assets/img/logo.svg" }));
        if (this.state.userInfo?.beta_tester) badges.push(h("i", { class: "material-icons" }, "science"));
        if (this.state.userInfo?.verified_publisher) badges.push(h("i", { class: "material-icons" }, "verified_user"));
        if (this.state.friend?.relation == FriendRelation.Friend) badges.push(h("i", { class: "material-icons" }, "diversity_3"));
        if (this.state.friend?.relation == FriendRelation.Blocked) badges.push(h("i", { class: "material-icons" }, "block"));
        const platforms = [];
        if (this.state.userInfo?.created_at) platforms.push(h("span", {}, "Registered: " + this.state.userInfo.created_at));
        if (this.state.userInfo?.has_w) platforms.push(h("img", { style: "padding-left: 0.4em; height:1em;", alt: "Owns Fluidity (Windows)", src: "./assets/img/windows10.svg" }));
        if (this.state.userInfo?.has_m) platforms.push(h("img", { style: "padding-left: 0.4em; height:1em;", alt: "Owns Fluidity M", src: "./assets/img/finder-mono.svg" }));
        if (this.state.userInfo?.has_i) platforms.push(h("img", { style: "padding-left: 0.4em; height:1em;", alt: "Owns Fluidity iOS", src: "./assets/img/ios.svg" }));

        const status = [];
        if (this.state.friend?.relation == FriendRelation.Blocked) status.push("Blocked");
        if (this.state.friend?.relation == FriendRelation.Friend) status.push("Friend");
        if (this.state.friend?.relation == FriendRelation.IncomingFriendRequest) status.push("would like to be friends");
        if (this.state.friend?.relation == FriendRelation.OutgoingFriendRequest) status.push("Outgoing friend request");
        if (this.state.friend?.status) status.push(this.state.friend.status);
        if (this.state.friend?.game) status.push("Playing " + this.state.friend.game.gameName);

        const actions = [];
        actions.push(h("button", { class: "outlinedBtn", onclick: this.toggleBlock.bind(this) }, this.state.friend?.relation == FriendRelation.Blocked ? "Unblock" : "Block"));
        if (this.state.friend?.relation == FriendRelation.IncomingFriendRequest) actions.push(h("button", { class: "outlinedBtn", onclick: this.denyFriendRequest.bind(this) }, "Deny Friend Request"));
        if (this.state.friend?.relation == FriendRelation.Friend) actions.push(h("button", { class: "outlinedBtn", onclick: this.unfriend.bind(this) }, "Unfriend"));
        if (this.state.friend?.relation !== FriendRelation.Blocked && this.state.friend?.relation !== FriendRelation.Friend) { actions.push(h("button", { class: "outlinedBtn primary", onclick: this.addFriend.bind(this) }, "Add Friend")); }

        if (this.state.friend?.relation == FriendRelation.Friend) {
            // actions.push(h("button", { class: "outlinedBtn", onclick: this.nudge.bind(this) }, "Nudge"));
            // actions.push(h("button", { class: "outlinedBtn", onclick: this.nudge.bind(this) }, "Send Script"));
        }

        return html`
            <${UiModalHeader} icon="${avatar}"/>
            <h1>${username} ${badges}</h1>
            <h2>${status.join(", ")}</h2>
            <h3>${platforms}</h3>
            <${UiDescription} text="${this.state.userInfo?.bio}" />
            <div class="modalActions" isBusy=${this.state.actionInProgress}>
                ${actions}
            </div>
        
        `;
    }
    async toggleBlock() {
        this.setState({ actionInProgress: true });
        if (this.state.friend?.relation == FriendRelation.Blocked) {
            await friendsManager.unblockUser(this.props.username);
        } else {
            await friendsManager.blockUser(this.props.username);
        }
        this.refresh();
    }
    async denyFriendRequest() {
        this.setState({ actionInProgress: true });
        await friendsManager.denyFriendRequest(this.props.username);
        this.refresh();
    }
    async unfriend() {
        this.setState({ actionInProgress: true });
        await friendsManager.unfriend(this.props.username);
        this.refresh();
    }
    async addFriend() {
        this.setState({ actionInProgress: true });
        await friendsManager.addFriend(this.props.username);
        this.refresh();
    }

    refresh() {
        this.setState({ friend: friendsManager.getUserByUsername(this.props.username), actionInProgress: false });
        friendsManager.getUserInfo(this.props.username).then((userInfo) => this.setState({ userInfo }));
    }
    componentWillMount() {
        this.refresh();
        friendsManager.on("friendsUpdated", () => this.refresh());
    }
    componentWillUnmount() {
        friendsManager.off("friendsUpdated", () => this.refresh());
    }
}

export function showUserModal(username:string) {
    return pushModal(UiModalUser, true, { username });
}