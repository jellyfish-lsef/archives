export default class EventEmitter {
    events = new Map<string, Array<Function>>();
    on(event: string, callback: Function) {
        if (!this.events.has(event)) this.events.set(event, []);
        this.events.get(event)!.push(callback);
    }
    emit(event: string, ...args: any[]) {
        if (!this.events.has(event)) return;
        this.events.get(event)!.forEach((callback) => callback(...args));
    }
    off(event: string, callback: Function) {
        if (!this.events.has(event)) return;
        this.events.get(event)!.splice(this.events.get(event)!.indexOf(callback), 1);
    }
}