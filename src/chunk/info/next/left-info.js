import Info from "./info";

export default class LeftInfo extends Info {
    constructor({prev, current}) {
        super({prev, current});

        this.siblingDistance = ((this.prev.offsetWidth + this.prev.offsetLeft) - (this.current.offsetWidth + this.current.offsetLeft));
    }

    /**
     * @return {number}
     */
    getSiblingDistance() {
        return this.siblingDistance;
    }
}