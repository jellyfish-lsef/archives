

type FriendStatus = "Online" | "Away" | "Do Not Disturb" | "Invisible" | "Offline";
// eslint-disable-next-line no-shadow
const enum FriendRelation {
    Unknown, Friend, IncomingFriendRequest, OutgoingFriendRequest, Blocked
}

type BaseUser = {username: string, avatar: string}
type BaseUserWithId = BaseUser & {id: number}
type BaseUserWithStatus = BaseUserWithId & {status?: FriendStatus, game?: string}
type BaseUserWithIdBlocked = BaseUser & {userId: number} // hate this api

interface FriendGameInfo {
    gameId: string;
    serverId?: string;
    gameName: string
}

interface Friend {
    username: string;
    avatar: string;
    id?: number;
    relation: FriendRelation;
    status?: FriendStatus;
    game?: FriendGameInfo;
}



interface FriendState {
    friends: Map<string, Friend>;
    friendRequests: {
        incoming: Map<string, Friend>;
        outgoing: Map<string, Friend>;
    }
    blockedUsers: Map<string, Friend>;
}

interface UserProfile {
    id: number;
    username: string;
    avatar: string;
    bio: string;
    beta_tester: 1 | null;
    has_w: 1 | null;
    has_m: 1 | null;
    has_i: 1 | null;
    verified_publisher: boolean;
    role_id: number;
    created_at: string;
    blocked: boolean;
    friend: boolean;
    staff: boolean;

}