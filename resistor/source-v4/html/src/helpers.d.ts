type Branch = {[key: string]: Leaf | string};

export function pathsToTree(paths: string[]): Branch;