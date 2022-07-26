import Info from "./info";
export default class RightInfo extends Info {
    constructor({ current, shift, windowWidth, reverse, }) {
        super({ current, shift, windowWidth, reverse });
        this.horizonHideDistance = 0;
        this.reverseFinishedPosition = 0;
        this.horizonHideDistance = 0;
        this.reverseFinishedPosition = 0;
        if (this.reverse === true) {
            this.horizon = this.windowWidth - shift.getBoundingClientRect().left;
            this.distance = this.current.offsetLeft - shift.offsetLeft;
            this.horizonHideDistance = this.windowWidth - current.getBoundingClientRect().left;
            this.reverseFinishedPosition -= this.distance;
        }
        else {
            this.horizon = this.windowWidth - current.getBoundingClientRect().left;
            this.distance = shift.offsetLeft - this.current.offsetLeft;
        }
    }
    getDistance() {
        return this.distance;
    }
    getHorizon() {
        return this.horizon;
    }
    getHorizonHideDistance() {
        return this.horizonHideDistance;
    }
    getReverseFinishedPosition() {
        return this.reverseFinishedPosition;
    }
}
