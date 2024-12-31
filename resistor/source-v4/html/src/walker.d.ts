export namespace walker {
    class Walker extends EventEmitter {
        /**
         * Setup a function to filter out directory entries.
         *
         * @param fn {Function} a function that will be given a directory name, which
         * if returns true will include the directory and it's children
         */
        filterDir(fn: (dir: string) => boolean): this;

        /**
         * Process a file or directory.
         * @param entry {string} the file or directory to process
         */
        process(entry: string): this;

        doneOne(): this;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        on(event: string, callback: (...args: any[]) => void): this;
        on(event: "error", callback: (er: Error, entry: string, stat: Stats) => void): this;
        on(event: "entry", callback: (entry: string, stat: Stats) => void): this;
        on(event: "dir", callback: (entry: string, stat: Stats) => void): this;
        on(event: "symlink", callback: (entry: string, stat: Stats) => void): this;
        on(event: "blockDevice", callback: (entry: string, stat: Stats) => void): this;
        on(event: "characterDevice", callback: (entry: string, stat: Stats) => void): this;
        on(event: "fifo", callback: (entry: string, stat: Stats) => void): this;
        on(event: "socket", callback: (entry: string, stat: Stats) => void): this;
    }
    export default function Walker(root: string): Walker;
}