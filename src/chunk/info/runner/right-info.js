import Info from "./info";

export default class RightInfo extends Info {
    constructor({current, distance}) {
        super({current, distance});

        this.horizon = ((global.pageXOffset + document.documentElement.clientWidth) - current.getBoundingClientRect().left);
        this.distance = (this.distance - this.current.offsetLeft);
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