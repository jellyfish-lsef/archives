function FakeResponse<R>(code: number, data: R) {
    return {
        ok: code >= 200 && code < 300,
        status: code,
        async json() {
            return data;
        },
        async text() {
            return typeof data !== "object" ? data : JSON.stringify(data);
        }
    } as Response;
}


const ScriptLibraryScript = () =>  ({
    id: 1,
    name: "Cool Script",
    description: "This is a cool script",
    thumbnail: "https://i.imgur.com/COgqRID.png",
    category: "General",
    open_source: 1,

    updated_at: "1970-01-01T00:00:00.000Z",
    created_at: "1970-01-01T00:00:00.000Z",

    user_id: 1,
    created_by: "FluidityUser",
    publisher_avatar: "https://i.imgur.com/COgqRID.png",
    verified_publisher: true,

    total_saves: 1337,
    likes: Math.floor(Math.random() * 1000),
    dislikes: Math.floor(Math.random() * 1000),

    saved: true,
    rating: { rating: Math.random() > 0.5 ? "like" : "dislike" }

} satisfies ScriptLibraryScriptInfo)

export async function MockDashboardAPI(url: string, options?: RequestInit) {
    console.log("Dashboard API:", url, options);
    if (url == "friends/outgoing") return FakeResponse<BaseUser[]>(200, []);
    if (url == "scripts/saved" || url == "scripts") return FakeResponse(200, {data: [ScriptLibraryScript()]});
    if (url.startsWith("scripts/opensource")) return FakeResponse(200, `loadstring(game:HttpGetAsync("https://raw.githubusercontent.com/richie0866/orca/master/public/latest.lua"))()`);
    if (url.startsWith("scripts/")) return FakeResponse(200, ScriptLibraryScript());

    return FakeResponse(404, { error: "Not found" });
}
export async function MockClientAPI(url: string, options?: RequestInit) {
    console.log("Client API:", url, options);
    if (url == "username") return FakeResponse<string>(200, "FluidityUser");
    if (url == "client/friends" || url.startsWith("client/friends/search")) {
        return FakeResponse<BaseUserWithId[]>(200, [

            {
                avatar: "https://i.imgur.com/COgqRID.png",
                username: "FluidityFriend",
                id: 2
            }

        ]);
    }
    if (url.startsWith("client/friends")) return FakeResponse<BaseUserWithId[]>(200, []);

    return FakeResponse(404, { error: "Not found" });
}