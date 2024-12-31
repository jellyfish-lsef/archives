const path = require("path");

export function pathsToTree(paths) {
    let tree = {};
    for (const pth of paths) {
        const parts = pth.split(path.sep);
        let node = tree;
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            if (!node[part]) node[part] = {};
            if (i == parts.length - 1) node[part] = pth;
            node = node[part];
        }
    }
    while (Object.keys(tree).length == 1) tree = tree[Object.keys(tree)[0]];
    while (typeof tree == "string") {
        tree = {
            [path.basename(tree)]: tree
        };
    }

    return tree;
}