import friendsManager from "../../../friends/logic/friendManager.js";

function friendsToVFS(friends: Map<string, Friend>): VfsPathEntry[] {
    return [...friends.values()].map((item: Friend) => ({
        name: item.username,
        type: "file",
        uri: monaco.Uri.parse("swui-user://" + item.username + "/" + item.avatar),
        icon: item.avatar
    } as VfsPathEntry));
}

export class FriendVFS implements IVFS {
    async readFile(path: monaco.Uri): Promise<string> {
        console.log("readFile", path);
        return path.toString();
    }
    async readDir(path: monaco.Uri): Promise<VfsEntry[]> {
        console.log("readDir", path);
        if (!friendsManager.friendsAvailable) {
            throw new Error("Friends not available, try again later.");
        }
        switch (path.path) {
            case "/pending":
                return friendsToVFS(friendsManager.friends.friendRequests.incoming);
            case "/outgoing":
                return friendsToVFS(friendsManager.friends.friendRequests.outgoing);
            case "/block":
                return friendsToVFS(friendsManager.friends.blockedUsers);
            default:
                return [
                    ...friendsToVFS(friendsManager.friends.friends),
                    { type: "seperator" },
                    { type: "directory", name: "Incoming Requests", uri: monaco.Uri.joinPath(path, "pending"), icon: "move_to_inbox" },
                    { type: "directory", name: "Outgoing Requests", uri: monaco.Uri.joinPath(path, "outgoing"), icon: "outbox" },
                    { type: "directory", name: "Blocked Users", uri: monaco.Uri.joinPath(path, "block"), icon: "block" }
                ];
        }
    }
}