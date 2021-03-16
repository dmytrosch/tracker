import { v4 as uuid } from "uuid";

export default class Tracker {
    constructor(name) {
        this.id = uuid();
        this.name = name ? name : "new tracker";
        this.isActive = true;
        this.startedAt = Date.now();
        this.stoppedAt = null;
    }
}
