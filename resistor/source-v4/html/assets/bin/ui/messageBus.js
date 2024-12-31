const { EventEmitter } = require("events");
const MessageBus = new EventEmitter();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.MessageBus = MessageBus;
export default MessageBus;
