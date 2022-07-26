import Info from "./info";
export default class RightInfo extends Info {
    constructor({ prev, current, reverse }) {
        super({ prev, current, reverse });
        this.siblingDistance = -(this.current.offsetWidth +
            this.current.offsetLeft -
            (this.prev.offsetWidth + this.prev.offsetLeft));
    }
    /**
     * @return {number}
     */
    getSiblingDistance() {
        return this.siblingDistance;
    }
}
