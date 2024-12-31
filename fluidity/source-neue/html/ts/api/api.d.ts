interface LocalUserInfo {
    id: number,
    username: string,
    email: string,
    avatar: string,
    role_id: number,
    status: string,
    last_login: string,
    two_factor_enabled: boolean,
    created_at: string,
    updated_at: string,
    has_m: boolean,
    has_w: boolean,
    has_i: boolean,
    is_staff: boolean
}
interface ScriptLibraryScriptInfo {
    id: number;
    name: string;
    description: string;
    thumbnail: string;
    category: string;
    open_source: 1 | null;

    updated_at: string;
    created_at: string;

    user_id: number;
    created_by: string;
    publisher_avatar: string;
    verified_publisher: boolean;

    total_saves: number;
    likes: number;
    dislikes: number;

    saved: boolean;
    rating: null | { rating: "like" | "dislike" };
}