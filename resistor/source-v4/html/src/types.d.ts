import EventEmitter from "events";

export interface ApplicationState {
    page: Page;
    title: string;
    injectionStatus: string | false;
}

export interface PageProps {
    appMessageBus: EventEmitter;
}

export type Page = "editor" | "tools" | "scripthub"

export interface ScriptHubScript {
    id: string;
    name: string;
    code: string;
    description?: string;
    category?: string;
    author?: {
        id: string;
        name: string;
        url?: string;
        image?: string;
        verified: boolean;
    }
    created?: Date;
    updated?: Date;
    image?: string;
    downloads?: number;
    /**
     * 0.0-1.0
     */
    rating?: number;
    /**
     * -1: downvoted, 0: neutral, 1: upvoted
     */
    userRating?: number;
    canRate: boolean;
    publicSource: boolean;
    userSaved: boolean;
}

export interface ScriptHub {
    searchType: "none" | "basic" | "resistor";
    serverFavourites: false;
    search: (query: string) => Promise<ScriptHubScript[]>;
    getScript: (id: string) => Promise<ScriptHubScript>;

    saveScript: (script: string, saved: boolean) => Promise<ScriptHubScript>;
    rateScript: (script: string, rating: number) => Promise<ScriptHubScript>;
}
export interface Exploit extends EventEmitter {
    init: () => Promise<void> | void;

    canInject: () => Promise<boolean> | boolean;
    injectNext: () => Promise<void> | void;
    inject: (pid: number) => Promise<void> | void;

    runScript: (script: string) => Promise<void> | void;

    scriptHub?: ScriptHub;
}