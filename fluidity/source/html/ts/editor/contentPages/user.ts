import { UiDescription } from "../../components/descriptionRenderer.js";
import friendsManager from "../../friends/logic/friendManager.js";
import htm from "../../lib/htm.js";
import { Component, h } from "../../lib/preact.js";
const html = htm.bind(h);

const dateFormatter = new Intl.DateTimeFormat(
    "en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric"
    });


// eslint-disable-next-line @typescript-eslint/ban-types
export class UserContent extends Component<{uri: monaco.Uri | null}, {userInfo?: UserProfile, actionInProgress: boolean}> {
    render() {
        const friend = friendsManager.getUserByUsername(this.props.uri!.authority!);
        const username = this.state.userInfo?.username || friend?.username || this.props.uri?.authority;
        const avatar = this.state.userInfo?.avatar || friend?.avatar;
        const badges = [];
        if (this.state.userInfo?.staff) badges.push(h("img", { style: "height:24px;", alt: "Fluidity Staff", src: "./assets/img/logo.png" }));
        if (this.state.userInfo?.beta_tester) badges.push(h("i", { class: "material-symbols" }, "science"));
        if (this.state.userInfo?.verified_publisher) badges.push(h("i", { class: "material-symbols" }, "verified_user"));
        if (friend?.relation == FriendRelation.Friend) badges.push(h("i", { class: "material-symbols" }, "group"));
        if (friend?.relation == FriendRelation.Blocked) badges.push(h("i", { class: "material-symbols" }, "block"));

        if (this.state.userInfo?.has_w) badges.push(h("img", { style: "padding-left: 0.2em; height: 24px;", alt: "Owns Fluidity (Windows)", src: "./assets/img/windows10.svg" }));
        if (this.state.userInfo?.has_m) badges.push(h("img", { style: "padding-left: 0.2em; height:24px;", alt: "Owns Fluidity M", src: "./assets/img/finder-mono.svg" }));
        if (this.state.userInfo?.has_i) badges.push(h("img", { style: "padding-left: 0.2em; height:24px;", alt: "Owns Fluidity iOS", src: "./assets/img/ios.svg" }));

        const status = [];
        if (friend?.relation == FriendRelation.Blocked) status.push("Blocked");
        if (friend?.relation == FriendRelation.Friend) status.push("Friend");
        if (friend?.relation == FriendRelation.IncomingFriendRequest) status.push("would like to be friends");
        if (friend?.relation == FriendRelation.OutgoingFriendRequest) status.push("Outgoing friend request");
        if (friend?.status) status.push(" • " + friend.status);
        if (friend?.game) status.push(" playing " + friend.game.gameName);

        if (this.state.userInfo?.created_at) {
            if (status.length) status.push(" •");
            status.push(" User since ");
            status.push(dateFormatter.format(new Date(this.state.userInfo.created_at)));
        }

        const actions = [];
        if (friend?.relation == FriendRelation.Friend) {
            actions.push(html`<button class="outlinedBtn primary" isBusy=${friendsManager.state !== "connected"} onclick=${() => friendsManager.pokeFriend(friend.id!)}><i class="material-symbols">notifications_active</i> Nudge</button>`);
            actions.push(html`<button class="outlinedBtn" onclick=${this.unfriend.bind(this)}><i class="material-symbols">person_remove</i> Unfriend</button>`);
        }
        if (friend?.relation == FriendRelation.IncomingFriendRequest || friend?.relation == FriendRelation.Unknown || friend?.relation === undefined) {
            actions.push(html`<button class="outlinedBtn primary" onclick=${this.addFriend.bind(this)}><i class="material-symbols">person_add</i> Add Friend</button>`);
        }
        if (friend?.relation == FriendRelation.IncomingFriendRequest) {
            actions.push(html`<button class="outlinedBtn danger" onclick=${this.denyFriendRequest.bind(this)}><i class="material-symbols">person_add_disabled</i> Decline Friend Request</button>`);
        }
        if (friend?.relation == FriendRelation.OutgoingFriendRequest) {
            actions.push(html`<button class="outlinedBtn" onclick=${this.cancelFr.bind(this)}><i class="material-symbols">person_add_disabled</i> Cancel Friend Request</button>`);
        }
        if (friend?.relation == FriendRelation.Blocked) {
            actions.push(html`<button class="outlinedBtn" onclick=${this.toggleBlock.bind(this)}><i class="material-symbols">check_circle</i> Unblock</button>`);
        } else {
            actions.push(html`<button class="outlinedBtn danger" onclick=${this.toggleBlock.bind(this)}><i class="material-symbols">block</i> Block</button>`);
        }


        if (friend?.relation == FriendRelation.Friend) {
            // actions.push(h("button", { class: "outlinedBtn", onclick: this.nudge.bind(this) }, "Nudge"));
            // actions.push(h("button", { class: "outlinedBtn", onclick: this.nudge.bind(this) }, "Send Script"));
        }

        return html`
                <div class="contentPage content-user">
                    <div class="contentPageHeader">
                        <div class="contentPageHeaderImage" style="background-image: url(${avatar})" alt="${username}" />
                        <div class="contentPageHeaderInfo">
                            <h1>${username} ${badges}</h1>
                            <h2>${status}</h2>
                        </div>
                    </div>
                    <div class="contentPageActions" isBusy=${this.state.actionInProgress}>
                        ${actions}
                    </div>
                    <${UiDescription} text="${this.state.userInfo?.bio}" />
                </div>
            
            `;
    }
    async toggleBlock() {
        this.setState({ actionInProgress: true });
        const friend = friendsManager.getUserByUsername(this.props.uri!.authority!);
        if (friend?.relation == FriendRelation.Blocked) {
            await friendsManager.unblockUser(this.props.uri!.authority!);
        } else {
            await friendsManager.blockUser(this.props.uri!.authority!);
        }
        this.refresh();
    }
    async cancelFr() {
        this.setState({ actionInProgress: true });
        // this is a haaack!
        await friendsManager.blockUser(this.props.uri!.authority!);
        await friendsManager.unblockUser(this.props.uri!.authority!);
        this.refresh();
    }
    async denyFriendRequest() {
        this.setState({ actionInProgress: true });
        await friendsManager.denyFriendRequest(this.props.uri!.authority!);
        this.refresh();
    }
    async unfriend() {
        this.setState({ actionInProgress: true });
        await friendsManager.unfriend(this.props.uri!.authority!);
        this.refresh();
    }
    async addFriend() {
        this.setState({ actionInProgress: true });
        await friendsManager.addFriend(this.props.uri!.authority!);
        this.refresh();
    }

    componentWillReceiveProps(nextProps: {uri: monaco.Uri | null}) {
        if (nextProps.uri!.authority != this.props.uri!.authority) {
            this.setState({ userInfo: undefined });
            this.props.uri = nextProps.uri;
            this.refresh();
        }
    }
    refresh() {
        this.setState({ actionInProgress: false });
        friendsManager.getUserInfo(this.props.uri!.authority!).then((userInfo) => this.setState({ userInfo }));
    }
    boundRefresh = this.refresh.bind(this);
    componentWillMount() {
        this.refresh();
        friendsManager.on("friendsUpdated", this.boundRefresh);
        friendsManager.on("stateChanged", this.boundRefresh);
    }
    componentWillUnmount() {
        friendsManager.off("friendsUpdated", this.boundRefresh);
        friendsManager.off("stateChanged", this.boundRefresh);
    }
}
