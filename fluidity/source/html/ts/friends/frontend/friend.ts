import htm from "../../lib/htm.js";
import { Component, h } from "../../lib/preact.js";
import { showUserModal } from "../../modal/UserModal.js";
const html = htm.bind(h);

export class UiFriend extends Component<{friend: Friend}> {
    render() {
        const friend = this.props.friend;
        let status = this.props.friend.relation == FriendRelation.Friend ? "offline" : "unknown";
        if (friend.status === "Online") status = "online";
        else if (friend.status === "Away") status = "away";
        else if (friend.status === "Do Not Disturb") status = "disturb";


        let statusText = "";
        if (status !== "offline") statusText = friend.status!;
        if (friend.relation == FriendRelation.Blocked) statusText = "Blocked";
        else if (friend.relation == FriendRelation.IncomingFriendRequest) statusText = "Incoming friend request";
        else if (friend.relation == FriendRelation.OutgoingFriendRequest) statusText = "Outgoing friend request";
        return html`
            <div class="script friend ${status}" data-id="${friend.id}" onclick=${() => showUserModal(friend.username)}>
                <div class="friendAvatar">
                    <img src="${friend.avatar}" />
                </div>
                <div class="friendDetails">
                    <b>${friend.username}</b>
                    <div class="friendStatus">${statusText}</div>
                </div>
            </div>
        `;
    }
}
