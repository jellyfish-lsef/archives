import render from "./ui/index.js";
import MessageBus from "./ui/messageBus.js";
window.onload = () => {
    MessageBus.emit("appLoaded");
};
render();
