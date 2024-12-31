const gameNameCache = new Map<string, Promise<string>>();

async function getGameName(gameId: string): Promise<string> {
    const universeF = await fetch("https://api.roblox.com/universes/get-universe-containing-place?placeid=" + gameId);
    const universe = await universeF.json();
    const gameInfoF = await fetch("https://games.roblox.com/v1/games?universeIds=" + universe.UniverseId);
    const gameInfo = await gameInfoF.json();
    const gameName = gameInfo.data[0].name;
    return gameName;
}

export async function getGameNameCached(gameId: string): Promise<string> {
    if (gameNameCache.has(gameId)) return gameNameCache.get(gameId)!;
    const gameName = getGameName(gameId);
    gameNameCache.set(gameId, gameName);
    return gameName;
}