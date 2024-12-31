interface InjectionStatus {
    globalStatus: string | null;
    processes: {[pid: number]: {
        status: string | null,

        universeId?: string;
        placeId?: string;
        userId?: string;
        userName?: string;
        userDisplayName?: string;
    }};
}

type ClassRef<T> = new (...args: any[]) => T;