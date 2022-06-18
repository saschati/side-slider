import Info from "./info";

export default class RightInfo extends Info {
    constructor({prev, current}) {
        super({prev, current});

        this.siblingDistance = -((this.current.offsetWidth + this.current.offsetLeft) - (this.prev.offsetWidth + this.prev.offsetLeft));
    }

    /**
     * @return {number}
     */
    getSiblingDistance() {
        return this.siblingDistance;
    }
}