import { UiSidebarHeader } from "../../components/sidebarHeader.js";
import htm from "../../lib/htm.js";
import { Component, h, render } from "../../lib/preact.js";
import friendsManager from "../logic/friendManager.js";
import { UiFriend } from "./friend.js";
const html = htm.bind(h);


class UiFriendsSidebar extends Component {
    render() {
        const content = [];
        const friends = friendsManager.getSortedFriends();
        content.push(h(UiSidebarHeader, { text: "Friends" }));
        if (friends.length > 0) {
            for (const friend of friends) content.push(h(UiFriend, { friend }));
        } else {
            content.push(h("center", {}, "You have no friends yet! Add some by entering their username in the search bar above."));
        }
        const requests = friendsManager.friends.friendRequests;
        if (requests.incoming.size > 0 || requests.outgoing.size > 0) {
            content.push(h(UiSidebarHeader, { text: "Requests" }));
            for (const friend of requests.incoming.values()) content.push(h(UiFriend, { friend }));
            for (const friend of requests.outgoing.values()) content.push(h(UiFriend, { friend }));
        }
        const blocked = friendsManager.friends.blockedUsers;
        if (blocked.size > 0) {
            content.push(h(UiSidebarHeader, { text: "Blocked" }));
            for (const friend of blocked.values()) content.push(h(UiFriend, { friend }));
        }
        return html`
        <input type="text" class="textbox" placeholder="Add Friends"  id="friendsSearch"></input>
        <div id="friendsSidebarContainer">
           ${content}
        </div>
        `;
    }
    constructor() {
        super();
        friendsManager.on("friendsUpdated", () => {
            this.setState({});
        });
    }
}


const parent = document.getElementById("friendSidebar")!;
parent.innerHTML = "";
render(html`<${UiFriendsSidebar} />`, parent);