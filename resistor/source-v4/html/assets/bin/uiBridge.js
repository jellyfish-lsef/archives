import MessageBus from "./ui/messageBus.js";
/**
 * Starts the injection process.
 * @param mode If mode is a number, the exploit is injected into the process with the given PID.
 *             If mode is a 'pre', the exploit is injected into the next process.
 *             If mode is not provided, the exploit is injected to the current process, if available, or into the next process otherwise.
 */
export function inject(_mode) {
    throw new Error("NYI!");
}
export function setInjectionStatus(status) {
    MessageBus.emit("injectionStatus", status);
}
export const UIMessageBus = MessageBus;
