import { getGameNameCached } from "../../api/Rbx.js";
import swapi from "../../api/SWAPI.js";
import { newModel } from "../../editor/monaco/monaco.js";
import EventEmitter from "../../eventEmitter.js";
import { Toast } from "../../toasts/toastManager.js";


class FriendsManager extends EventEmitter {
    RT_ENDPOINT = "https://friends.fluidity.developer.com/";

    socket?: SocketIOClient.Socket;
    friends: FriendState = {
        friends: new Map(),
        friendRequests: {
            incoming: new Map(),
            outgoing: new Map()
        },
        blockedUsers: new Map()
    };
    friendsAvailable = false;
    userIdUsernameMap: Map<number | string, string | number> = new Map();
    state: "disconnected" | "connecting" | "connected" = "disconnected";

    constructor() {
        super();
        const self = this;
        setInterval((() => {
            if (self.socket?.connected) (self.socket as any).emit("ping", 0);
        }), 3000);
    }

    private _addFriend(user: BaseUser, relation: FriendRelation) {
        const friend:Friend = {
            username: user.username,
            avatar: user.avatar,
            relation
        };
        const id = (user as BaseUserWithId).id;
        if (id) {
            friend.id = id;
            this.userIdUsernameMap.set(id, user.username);
            this.userIdUsernameMap.set(user.username, id);
        }
        if (relation) {
            if (this.friends.friends.has(user.username)) this.friends.friends.delete(user.username);
            if (this.friends.blockedUsers.has(user.username)) this.friends.blockedUsers.delete(user.username);
            if (this.friends.friendRequests.incoming.has(user.username)) this.friends.friendRequests.incoming.delete(user.username);
            if (this.friends.friendRequests.outgoing.has(user.username)) this.friends.friendRequests.outgoing.delete(user.username);
            switch (relation) {
                case FriendRelation.Friend:
                    this.friends.friends.set(user.username, friend);
                    break;
                case FriendRelation.IncomingFriendRequest:
                    this.friends.friendRequests.incoming.set(user.username, friend);
                    break;
                case FriendRelation.OutgoingFriendRequest:
                    this.friends.friendRequests.outgoing.set(user.username, friend);
                    break;
                case FriendRelation.Blocked:
                    this.friends.blockedUsers.set(user.username, friend);
                    break;
            }
        }
    }


    private friendStatusMap: Map<string, {status: FriendStatus, game?: FriendGameInfo}> = new Map();
    updateFriendStatus(update:BaseUserWithStatus) {
        if ((update as any).place && (update as any).place !== "None") update.game = (update as any).place;
        if (update.game == "None") delete update.game;

        const key = update.username ? update.username : this.userIdUsernameMap.get(update.id) as string;
        const friend = this.friends.friends.get(key);
        if (!key || !friend) return;
        const fsm = this.friendStatusMap.get(key) || { status: "" };
        if (update.status) fsm.status = update.status;
        if (update.game) {
            friend.game = undefined;
        }

        this.emit("friendsUpdated", this.state);
    }

    async fetchFriends() {
        this.friends = {
            friends: new Map(),
            friendRequests: {
                incoming: new Map(),
                outgoing: new Map()
            },
            blockedUsers: new Map()
        };
        await Promise.all([
            swapi.makeClientApiRequest("client/friends").then((r) => r.json())
                .then((json) => json.forEach((user: BaseUserWithId) => this._addFriend(user, FriendRelation.Friend))),
            swapi.makeClientApiRequest("client/friends/pending").then((r) => r.json())
                .then((json) => json.forEach((user: BaseUserWithId) => this._addFriend(user, FriendRelation.IncomingFriendRequest))),
            swapi.makeDashboardApiRequest("friends/outgoing").then((r) => r.json())
                .then((json) => json.forEach((user: BaseUser) => this._addFriend(user, FriendRelation.OutgoingFriendRequest))),
            swapi.makeClientApiRequest("client/friends/blocked").then((r) => r.json())
                .then((json) => json.forEach((user: BaseUserWithId) => this._addFriend(user, FriendRelation.Blocked)))

        ]);
        console.log(this.friends);
        this.emit("friendsUpdated", this.friends);
        this.friendsAvailable = true;
        return this.friends;
    }

    private _fetchTimeout = 0;
    async requestFetchFriends() {
        if (this._fetchTimeout) clearTimeout(this._fetchTimeout);
        // @ts-expect-error -- since we have node types, typescripts thinks
        // we're using nodejs's setTimeout, which apparently doesn't
        // return a number.
        this._fetchTimeout = setTimeout(() => this.fetchFriends(), 30);
    }

    private friendJoined(friend:Friend, game:string, server?:string) {
        const gameInfo = {
            gameId: game,
            serverId: server,
            gameName: "Loading..."
        };
        getGameNameCached(game).then((name) => {
            gameInfo.gameName = name;
            this.emit("friendsUpdated", this.state);
        }).catch(console.error);
        friend.game = gameInfo;
        this.emit("friendsUpdated", this.state);
    }




    connectToRt(): Promise<void> {
        return new Promise((a, r) => {
            const friendPromise = this.fetchFriends();
            console.log("[RT] Attempt to connect to RT");
            this.socket?.disconnect();
            this.state = "connecting";
            this.emit("stateChange", this.state);

            this.socket = io(this.RT_ENDPOINT, { reconnectionAttempts: 5 });

            this.socket.on("connect", async() => {
                console.log("[RT] Connected to RT");
                await friendPromise;
                this.socket?.emit("init", swapi.clientAuthToken);
            });
            this.socket.on("connect_error", (e: string) => {
                console.error("[RT] Connection to RT failed", e);
                this.state = "disconnected";
                this.emit("stateChange", this.state);
                r(e);
            });
            this.socket.on("disconnect", () => {
                console.log("[RT] Disconnected from RT");
                this.state = "disconnected";
                this.emit("stateChange", this.state);
            });

            this.socket.on("auth_success", (message: string) => {
                console.log("[RT] RT Auth", message);
                this.emit("stateChange", this.state);
                this.state = "connected";
                a();
            });
            this.socket.on("auth_failure", (message: string) => {
                console.error("[RT] RT Auth Fail", message);
                this.state = "disconnected";
                this.emit("stateChange", this.state);
                this.socket?.disconnect();
                r(message);
            });
            this.socket.on("auth_error", (message: string) => {
                console.error("[RT] RT Auth Error", message);
                this.state = "disconnected";
                this.emit("stateChange", this.state);
                this.socket?.disconnect();
                r(message);
            });


            this.socket.on("friendship_request_accepted", (friendJ:string) => {
                const friend = JSON.parse(friendJ) as BaseUserWithId;
                this._addFriend(friend, FriendRelation.Friend);
                if (this.friends.friendRequests.incoming.has(friend.username)) this.friends.friendRequests.incoming.delete(friend.username);
                if (this.friends.friendRequests.outgoing.has(friend.username)) this.friends.friendRequests.outgoing.delete(friend.username);
                this.emit("friendsUpdated", this.state);
                this.requestFetchFriends();
                new Toast({
                    type: "success",
                    title: friend.username,
                    message: "accepted your friend request!",
                    icon: "person_add",
                    timeout: 5000
                });
            });
            this.socket.on("friendship_removed", (id:number) => {
                const username = this.userIdUsernameMap.get(id) as string;
                if (!username) return console.error("[RT] Removed unknown friend", id);
                if (this.friends.friends.has(username)) this.friends.friends.delete(username);
                this.emit("friendsUpdated", this.state);
                this.requestFetchFriends();
            });
            this.socket.on("friendship_request_received", (friendJ:string) => {
                const friend = JSON.parse(friendJ) as BaseUserWithId;
                this._addFriend(friend, FriendRelation.IncomingFriendRequest);
                this.emit("friendsUpdated", this.state);
                this.requestFetchFriends();
            });
            this.socket.on("friendship_request_success", (_id:number) => {
                this.requestFetchFriends();
                new Toast({
                    type: "info",
                    title: "New friend request",
                    message: "You have a new friend request",
                    icon: "person_add",
                    timeout: 5000
                });
            });

            this.socket.on("friend_payload", (jsonUpdate: string) => {
                const updates = JSON.parse(jsonUpdate)[0];
                for (const update of updates) {
                    try {
                        this.updateFriendStatus(update);
                    } catch (e) {
                        console.error("[RT]", e, update);
                    }
                }
                this.emit("friendsUpdated", this.state);
            });
            this.socket.on("friend_status", ([id, status] : [number, FriendStatus]) => {
                const friend = this.friends.friends.get(this.userIdUsernameMap.get(id) as string);
                if (!friend) return console.error("[RT] Recieved status update for unknown user.", id, status);
                friend.status = status;
                this.emit("friendsUpdated", this.state);
            });


            this.socket.on("friend_joined", ([user, game, server] : [number, string, string]) => {
                const friend = this.friends.friends.get(this.userIdUsernameMap.get(user) as string);
                if (!friend) return console.error("[RT] Recieved status update for unknown user.", user, game, server);
                this.friendJoined(friend, game, server);
            });
            this.socket.on("friend_left", ([user, game, server] : [number, string, string]) => {
                const friend = this.friends.friends.get(this.userIdUsernameMap.get(user) as string);
                if (!friend) return console.error("[RT] Recieved status update for unknown user.", user, game, server);
                friend.game = undefined;
                this.emit("friendsUpdated", this.state);
            });

            this.socket.on("script_shared", ([username, fileName, compressed] : [number, string, string]) => {
                new Toast({
                    type: "info",
                    title: "Downloading",
                    message: `script from ${username}: ${fileName}`,
                    icon: "send_and_archive",
                    timeout: 5000
                });
                let buffer = Buffer.from(compressed, "base64");
                buffer = buffer.subarray(4, buffer.length - 4);
                const gunzip = require("zlib").createGunzip();
                gunzip.write(buffer);
                const uri = "fluiditytemp://" + username + "_" + fileName.replace(/[^a-zA-Z0-9]/g, "_");
                console.log(uri);
                const model = newModel("", uri);
                let val = "";
                gunzip.on("data", (d: Buffer) => {
                    val += d.toString();
                    model.setValue(val);
                });
            });

            this.socket.on("poked_friend", (username:string) => {
                const audio = new Audio("./assets/audio/nudge.mp3");
                audio.play();
                document.body.classList.add("shake");
                setTimeout(() => {
                    document.body.classList.remove("shake");
                    audio.remove();
                }, 1070);
                new Toast({
                    type: "info",
                    title: "Hey!",
                    message: `${username} just poked you!`,
                    icon: "notifications_active",
                    timeout: 5000
                });
            });

            this.socket.on("poke_failed", (reason:string) => {
                console.error("[RT] Poke failed", reason);
                new Toast({
                    type: "danger",
                    title: "Poke failed",
                    message: reason,
                    icon: "notifications_off",
                    timeout: 5000
                });
                this.emit("actionFail", reason);
            });
            this.socket.on("share_script_failed", (reason:string) => {
                console.error("[RT] Share failed", reason);
                new Toast({
                    type: "danger",
                    title: "Share failed",
                    message: reason,
                    icon: "cancel_shedule_send",
                    timeout: 5000
                });
                this.emit("actionFail", reason);
            });
        });
    }



    getUserByUsername(username: string) {
        return this.friends.friends.get(username) || this.friends.friendRequests.incoming.get(username) || this.friends.friendRequests.outgoing.get(username) || this.friends.blockedUsers.get(username);
    }
    getUserById(id: number) {
        return this.getUserByUsername(this.userIdUsernameMap.get(id) as string);
    }

    private userInfoCache: Map<string, UserProfile> = new Map();
    async getUserInfo(username: string): Promise<UserProfile> {
        if (!this.userInfoCache.has(username)) {
            const resp = await swapi.makeDashboardApiRequest(`bio/${username}`).then((r) => r.text());
            const userInfoResponse: {success: boolean, user: UserProfile} = JSON.parse(resp);
            if (!userInfoResponse.success) throw new Error(resp);
            this.userInfoCache.set(username, userInfoResponse.user);
        }
        return this.userInfoCache.get(username)!;
    }


    private calculateFriendSortPosition(friend: Friend) {
        let score = ["Offline", "Invisible", "Do Not Disturb", "Away", "Online"].indexOf(friend.status!);
        if (friend.game) score += 0.5;
        score *= 1000000;
        score += friend.username.charCodeAt(0);
        return score;
    }

    getSortedFriends(): Friend[] {
        const friends = Array.from(this.friends.friends.values());
        friends.sort((a, b) => this.calculateFriendSortPosition(b) - this.calculateFriendSortPosition(a));
        return friends;
    }


    async blockUser(username: string) {
        const block = await swapi.makeDashboardApiRequest("friends/block/" + encodeURIComponent(username));
        await this.fetchFriends();
        const json = await block.json();
        if (json.success) {
            return json;
        } else {
            throw new Error(json.message);
        }
    }
    async unblockUser(username: string) {
        const block = await swapi.makeDashboardApiRequest("friends/unblock/" + encodeURIComponent(username));
        await this.fetchFriends();
        const json = await block.json();
        if (json.success) {
            return json;
        } else {
            throw new Error(json.message);
        }
    }
    async denyFriendRequest(username: string) {
        const block = await swapi.makeDashboardApiRequest("friends/decline/" + encodeURIComponent(username));
        this.friends.friendRequests.incoming.delete(username);
        this.requestFetchFriends();
        const json = await block.json();
        if (json.success) {
            return json;
        } else {
            throw new Error(json.message);
        }
    }
    async addFriend(username: string) {
        const block = await swapi.makeDashboardApiRequest("friends/request/" + encodeURIComponent(username));
        await this.fetchFriends();
        const json = await block.json();
        if (json.success) {
            return json;
        } else {
            throw new Error(json.message);
        }
    }
    async unfriend(username: string) {
        const block = await swapi.makeDashboardApiRequest("friends/remove/" + encodeURIComponent(username));
        this.friends.friends.delete(username);
        this.requestFetchFriends();
        const json = await block.json();
        if (json.success) {
            return json;
        } else {
            throw new Error(json.message);
        }
    }




    pokeFriend(id: number) {
        if (this.state !== "connected") return this.emit("actionFail", "Not connected.");
        this.socket?.emit("poke_friend", id);
        // could listen for poke_success and poke_failed
    }
    sendScript(id: number, fileName: string, script:string) {
        if (this.state !== "connected") return this.emit("actionFail", "Not connected.");
        require("zlib").gzip(script, (err:Error, compressed:Buffer) => {
            if (err) alert("Could not compress script\n" + err.toString());
            const sendBuffer = Buffer.alloc(compressed.length + 4);
            sendBuffer.writeUInt32LE(script.length);
            compressed.copy(sendBuffer, 0);
            this.socket?.emit("share_script", id, fileName, sendBuffer.toString("base64"));
        });
    }

    uncompressScript(compressed:string, callback: (data:string) => void) {
        let buffer = Buffer.from(compressed, "base64");
        buffer = buffer.subarray(4, buffer.length - 4);
        const gunzip = require("zlib").createGunzip();
        gunzip.write(buffer);
        let data = "";
        gunzip.on("data", (chunk:Buffer) => {
            data += chunk.toString();
            callback(data);
        });
    }
}

const friendsManager = new FriendsManager();
(window as any).friendsManager = friendsManager;
export default friendsManager;