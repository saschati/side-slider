import Info from "./info";

export default class LeftInfo extends Info {
    constructor({current, distance}) {
        super({current, distance});

        this.horizon = current.getBoundingClientRect().right;
        this.distance = (this.distance - (this.current.offsetLeft + this.current.offsetWidth));
    }

    /**
     * @return {number}
     */
    getDistance() {
        return this.distance;
    }

    /**
     * @return {number}
     */
    getHorizon() {
        return this.horizon;
    }
}