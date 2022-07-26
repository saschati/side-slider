import Info from "./info";
export default class LeftInfo extends Info {
    constructor({ prev, current, reverse }) {
        super({ prev, current, reverse });
        this.siblingDistance =
            this.prev.offsetWidth + this.prev.offsetLeft - (this.current.offsetWidth + this.current.offsetLeft);
    }
    getSiblingDistance() {
        return this.siblingDistance;
    }
}
