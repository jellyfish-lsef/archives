import type { EventEmitter as TEventEmitter } from "events";
import { Page } from "../types";
const { EventEmitter } = require("events");

export interface MessageBus extends TEventEmitter {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    emit(event: string, ...args: any[]): boolean;
    on(event: string, listener: (...args: any[]) => void): this;
    /* eslint-enable @typescript-eslint/no-explicit-any */

    // Change the currently displayed page.
    emit(event: "setPage", page: Page): boolean;
    // Called when the active page changes.
    on(event: "setPage", listener: (page: Page) => void): this;

    // Change the window titlebar text.
    emit(event: "titleChange", title: string): boolean;
    // Called when the window titlebar text changes.
    on(event: "titleChange", listener: (title: string) => void): this;

    /*
        Call this to change the injection status. If the status is false, the
        injection button is enabled. If the status is a string, the injection
        button is disabled and the string is displayed in the button.
    */
    emit(event: "injectionStatus", status: false | string): boolean;
    /**
     * Called when the injection status changes.
     * If the status is false, the injection button is enabled.
     * If the status is a string, the injection button is disabled and the string
     * is displayed in the button.
     */
    on(event: "injectionStatus", listener: (status: false | string) => void): this;

    /**
     * Called to create a new tab in the editor.
     */
    emit(event: "createEditorTab", path?: string, value?: string): boolean;
    /**
     * Called when a someone is requesting to create a new tab in the editor.
     */
    on(event: "createEditorTab", listener: (path?: string, value?: string) => void): this;

    /**
     * Called to acklowledge that a script has been ran
     */
     emit(event: "scriptRan"): boolean;
     /**
      * Called when a script has been ran
      */
     on(event: "scriptRan"): this;
}

const MessageBus = new EventEmitter() as MessageBus;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).MessageBus = MessageBus;
export default MessageBus;