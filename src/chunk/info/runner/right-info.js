import Info from "./info";

export default class RightInfo extends Info {
    constructor({current, shift, windowWidth, reverse}) {
        super({current, shift, windowWidth, reverse});

        this.horizonHideDistance = 0;
        this.reverseFinishedPosition = 0;

        if (this.reverse === true) {
            this.horizon = (this.windowWidth - shift.getBoundingClientRect().left);
            this.distance = (this.current.offsetLeft - shift.offsetLeft)

            this.horizonHideDistance = (this.windowWidth - current.getBoundingClientRect().left);
            this.reverseFinishedPosition -= this.distance;
        } else {
            this.horizon = (this.windowWidth - current.getBoundingClientRect().left);
            this.distance = (shift.offsetLeft - this.current.offsetLeft);
        }
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

    /**
     * @return {number}
     */
    getHorizonHideDistance() {
        return this.horizonHideDistance;
    }

    /**
     * @return {number}
     */
    getReverseFinishedPosition() {
        return this.reverseFinishedPosition;
    }
}